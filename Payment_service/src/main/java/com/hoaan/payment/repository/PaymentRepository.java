package com.hoaan.payment.repository;

import com.hoaan.payment.model.PaymentTransaction;
import com.hoaan.payment.model.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<PaymentTransaction, Long> {
    Optional<PaymentTransaction> findByPaymentId(String paymentId);
    Optional<PaymentTransaction> findByIdempotencyKey(String idempotencyKey);
    Optional<PaymentTransaction> findByOrderIdAndMethod(String orderId, com.hoaan.payment.model.PaymentMethod method);
    List<PaymentTransaction> findTop20ByStatusOrderByCreatedAtAsc(PaymentStatus status);
}
