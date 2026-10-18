package com.hoaan.payment.gateway;

public record GatewayResult(boolean requiresAction, String checkoutUrl, String providerTransactionId, String failureReason) {
    public static GatewayResult completed(String tx) { return new GatewayResult(false, null, tx, null); }
    public static GatewayResult action(String url) { return new GatewayResult(true, url, null, null); }
    public static GatewayResult failed(String reason) { return new GatewayResult(false, null, null, reason); }
}
