package com.hoaan.payment.service;

import com.hoaan.payment.api.CreatePaymentRequest;
import com.hoaan.payment.model.*;
import com.hoaan.payment.repository.PaymentRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
public class PaymentService {
    private final PaymentRepository repository;
    public PaymentService(PaymentRepository repository) { this.repository = repository; }

    @Transactional
    public PaymentTransaction create(String idempotencyKey, CreatePaymentRequest req) {
        var existing = repository.findByIdempotencyKey(idempotencyKey);
        if (existing.isPresent()) {
            PaymentTransaction p = existing.get();
            if (!p.getOrderId().equals(req.orderId()) || p.getAmount().compareTo(req.amount()) != 0 || p.getMethod() != req.method())
                throw new IllegalArgumentException("Idempotency-Key was already used with a different payment request");
            return p;
        }
        PaymentTransaction p = new PaymentTransaction();
        p.setPaymentId("pay_" + UUID.randomUUID().toString().replace("-", ""));
        p.setIdempotencyKey(idempotencyKey); p.setOrderId(req.orderId()); p.setAmount(req.amount());
        p.setCurrency(req.currency() == null || req.currency().isBlank() ? "VND" : req.currency());
        p.setMethod(req.method()); p.setStatus(PaymentStatus.PENDING);
        try { return repository.saveAndFlush(p); }
        catch (DataIntegrityViolationException race) {
            return repository.findByIdempotencyKey(idempotencyKey).orElseThrow(() -> race);
        }
    }
    @Transactional(readOnly=true)
    public PaymentTransaction get(String paymentId) { return repository.findByPaymentId(paymentId).orElseThrow(() -> new PaymentNotFoundException(paymentId)); }
}
