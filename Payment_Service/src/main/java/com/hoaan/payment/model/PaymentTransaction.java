package com.hoaan.payment.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "payment_transactions", indexes = {
    @Index(name = "idx_payment_status_created", columnList = "status,created_at"),
    @Index(name = "idx_payment_order", columnList = "order_id")
})
public class PaymentTransaction {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "payment_id", nullable = false, unique = true, length = 40)
    private String paymentId;
    @Column(name = "idempotency_key", nullable = false, unique = true, length = 100)
    private String idempotencyKey;
    @Column(name = "order_id", nullable = false, length = 100)
    private String orderId;
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;
    @Column(nullable = false, length = 3)
    private String currency;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 24)
    private PaymentMethod method;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 24)
    private PaymentStatus status;
    @Column(name = "checkout_url", length = 1000)
    private String checkoutUrl;
    @Column(name = "provider_transaction_id", length = 100)
    private String providerTransactionId;
    @Column(name = "failure_reason", length = 500)
    private String failureReason;
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist void onCreate() { createdAt = Instant.now(); updatedAt = createdAt; }
    @PreUpdate void onUpdate() { updatedAt = Instant.now(); }
    public Long getId() { return id; }
    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String v) { paymentId = v; }
    public String getIdempotencyKey() { return idempotencyKey; }
    public void setIdempotencyKey(String v) { idempotencyKey = v; }
    public String getOrderId() { return orderId; }
    public void setOrderId(String v) { orderId = v; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal v) { amount = v; }
    public String getCurrency() { return currency; }
    public void setCurrency(String v) { currency = v; }
    public PaymentMethod getMethod() { return method; }
    public void setMethod(PaymentMethod v) { method = v; }
    public PaymentStatus getStatus() { return status; }
    public void setStatus(PaymentStatus v) { status = v; }
    public String getCheckoutUrl() { return checkoutUrl; }
    public void setCheckoutUrl(String v) { checkoutUrl = v; }
    public String getProviderTransactionId() { return providerTransactionId; }
    public void setProviderTransactionId(String v) { providerTransactionId = v; }
    public String getFailureReason() { return failureReason; }
    public void setFailureReason(String v) { failureReason = v; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
