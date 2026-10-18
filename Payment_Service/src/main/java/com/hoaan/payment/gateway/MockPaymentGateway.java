package com.hoaan.payment.gateway;

import com.hoaan.payment.model.PaymentTransaction;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name="app.gateway", havingValue="mock", matchIfMissing=true)
public class MockPaymentGateway implements PaymentGateway {
    @Override public GatewayResult start(PaymentTransaction p) {
        return GatewayResult.completed("MOCK-" + p.getPaymentId());
    }
}
