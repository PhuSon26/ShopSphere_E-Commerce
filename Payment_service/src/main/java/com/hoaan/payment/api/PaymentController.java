package com.hoaan.payment.api;

import com.hoaan.payment.service.PaymentService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
@Validated
public class PaymentController {
    private final PaymentService payments;
    public PaymentController(PaymentService payments) { this.payments=payments; }
    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public PaymentResponse create(@RequestHeader("Idempotency-Key") @NotBlank String key, @Valid @RequestBody CreatePaymentRequest req) {
        return PaymentResponse.from(payments.create(key, req));
    }
    @GetMapping("/{paymentId}")
    public PaymentResponse get(@PathVariable String paymentId) { return PaymentResponse.from(payments.get(paymentId)); }
}
