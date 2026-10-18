package com.hoaan.payment.service;

import com.hoaan.payment.gateway.PaymentGateway;
import com.hoaan.payment.model.PaymentStatus;
import com.hoaan.payment.repository.PaymentRepository;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@ConditionalOnProperty(name="app.role", havingValue="worker")
public class PaymentProcessor {
    private final PaymentRepository repository;
    private final PaymentGateway gateway;
    public PaymentProcessor(PaymentRepository repository, PaymentGateway gateway) { this.repository=repository; this.gateway=gateway; }

    @Transactional
    public void process(Long id) {
        var optional = repository.findById(id);
        if (optional.isEmpty()) return;
        var p = optional.get();
        if (p.getStatus() != PaymentStatus.PENDING) return;
        p.setStatus(PaymentStatus.PROCESSING);
        repository.flush();
        var result = gateway.start(p);
        if (result.failureReason() != null) { p.setStatus(PaymentStatus.FAILED); p.setFailureReason(result.failureReason()); }
        else if (result.requiresAction()) { p.setStatus(PaymentStatus.REQUIRES_ACTION); p.setCheckoutUrl(result.checkoutUrl()); }
        else { p.setStatus(PaymentStatus.SUCCEEDED); p.setProviderTransactionId(result.providerTransactionId()); }
    }
}
