package com.hoaan.payment.service;

import com.hoaan.payment.model.PaymentStatus;
import com.hoaan.payment.repository.PaymentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name="app.role", havingValue="worker")
public class PaymentWorker {
    private static final Logger log = LoggerFactory.getLogger(PaymentWorker.class);
    private final PaymentRepository repository;
    private final PaymentProcessor processor;
    public PaymentWorker(PaymentRepository repository, PaymentProcessor processor) { this.repository=repository; this.processor=processor; }

    @Scheduled(fixedDelayString="${app.worker.poll-ms:3000}")
    public void processPending() {
        repository.findTop20ByStatusOrderByCreatedAtAsc(PaymentStatus.PENDING).forEach(p -> {
            try { processor.process(p.getId()); } catch (Exception e) { log.error("Payment processing failed for {}", p.getPaymentId(), e); }
        });
    }
}
