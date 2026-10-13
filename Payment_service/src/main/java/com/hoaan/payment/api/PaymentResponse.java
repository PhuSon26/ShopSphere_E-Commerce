package com.hoaan.payment.api;

import com.hoaan.payment.model.PaymentMethod;
import com.hoaan.payment.model.PaymentStatus;
import com.hoaan.payment.model.PaymentTransaction;
import java.math.BigDecimal;
import java.time.Instant;

public record PaymentResponse(String paymentId, String orderId, BigDecimal amount, String currency,
                              PaymentMethod method, PaymentStatus status, String checkoutUrl,
                              String failureReason, Instant createdAt, Instant updatedAt) {
    public static PaymentResponse from(PaymentTransaction p) {
        return new PaymentResponse(p.getPaymentId(), p.getOrderId(), p.getAmount(), p.getCurrency(),
            p.getMethod(), p.getStatus(), p.getCheckoutUrl(), p.getFailureReason(), p.getCreatedAt(), p.getUpdatedAt());
    }
}
