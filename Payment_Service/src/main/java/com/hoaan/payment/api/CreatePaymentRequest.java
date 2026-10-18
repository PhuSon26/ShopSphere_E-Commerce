package com.hoaan.payment.api;

import com.hoaan.payment.model.PaymentMethod;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record CreatePaymentRequest(
    @NotBlank @Size(max=100) String orderId,
    @NotNull @DecimalMin(value="1.00") @Digits(integer=17, fraction=2) BigDecimal amount,
    @Pattern(regexp="VND|USD") String currency,
    @NotNull PaymentMethod method
) {}
