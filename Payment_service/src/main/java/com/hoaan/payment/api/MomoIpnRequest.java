package com.hoaan.payment.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record MomoIpnRequest(String partnerCode, String orderId, String requestId, Long amount,
    String orderInfo, String orderType, String transId, Long responseTime, Integer resultCode,
    String message, String payType, String extraData, String signature) {}
