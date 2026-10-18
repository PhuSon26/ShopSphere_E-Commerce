package com.hoaan.payment.gateway;

import com.hoaan.payment.model.PaymentTransaction;

public interface PaymentGateway { GatewayResult start(PaymentTransaction payment); }
