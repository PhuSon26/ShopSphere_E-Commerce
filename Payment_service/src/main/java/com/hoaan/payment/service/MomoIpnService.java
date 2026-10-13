package com.hoaan.payment.service;

import com.hoaan.payment.api.MomoIpnRequest;
import com.hoaan.payment.gateway.MomoGateway;
import com.hoaan.payment.model.PaymentMethod;
import com.hoaan.payment.model.PaymentStatus;
import com.hoaan.payment.repository.PaymentRepository;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@ConditionalOnProperty(name="app.gateway", havingValue="momo")
public class MomoIpnService {
    private final MomoGateway gateway;
    private final PaymentRepository repository;
    public MomoIpnService(MomoGateway gateway, PaymentRepository repository) { this.gateway=gateway; this.repository=repository; }
    @Transactional
    public void accept(MomoIpnRequest r) {
        if (!gateway.verifyIpn(r)) throw new IllegalArgumentException("Invalid MoMo signature");
        var payment = repository.findByPaymentId(r.orderId()).orElseThrow(() -> new PaymentNotFoundException(r.orderId()));
        if (payment.getMethod() != PaymentMethod.MOMO || payment.getAmount().longValue() != r.amount())
            throw new IllegalArgumentException("MoMo payment details do not match");
        if (payment.getStatus() == PaymentStatus.SUCCEEDED || payment.getStatus() == PaymentStatus.FAILED) return;
        if (r.resultCode() != null && r.resultCode() == 0) {
            payment.setStatus(PaymentStatus.SUCCEEDED); payment.setProviderTransactionId(r.transId()); payment.setFailureReason(null);
        } else {
            payment.setStatus(PaymentStatus.FAILED); payment.setFailureReason("MoMo resultCode=" + r.resultCode());
        }
    }
}
