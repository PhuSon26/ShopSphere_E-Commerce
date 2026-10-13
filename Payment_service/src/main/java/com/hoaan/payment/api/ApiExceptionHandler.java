package com.hoaan.payment.api;

import com.hoaan.payment.service.PaymentNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(PaymentNotFoundException.class) @ResponseStatus(HttpStatus.NOT_FOUND)
    Map<String,Object> notFound(RuntimeException e) { return Map.of("timestamp", Instant.now(), "error", e.getMessage()); }
    @ExceptionHandler({IllegalArgumentException.class, MethodArgumentNotValidException.class}) @ResponseStatus(HttpStatus.BAD_REQUEST)
    Map<String,Object> badRequest(Exception e) { return Map.of("timestamp", Instant.now(), "error", e.getMessage() == null ? "Invalid request" : e.getMessage()); }
}
