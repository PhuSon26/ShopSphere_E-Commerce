package com.hoaan.payment.gateway;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hoaan.payment.model.PaymentTransaction;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;
import java.util.LinkedHashMap;
import java.util.Map;

@Component
@ConditionalOnProperty(name="app.gateway", havingValue="momo")
public class MomoGateway implements PaymentGateway {
    private final RestClient http = RestClient.create();
    private final ObjectMapper mapper;
    @Value("${app.momo.partner-code}") private String partnerCode;
    @Value("${app.momo.access-key}") private String accessKey;
    @Value("${app.momo.secret-key}") private String secretKey;
    @Value("${app.momo.endpoint}") private String endpoint;
    @Value("${app.momo.redirect-url}") private String redirectUrl;
    @Value("${app.momo.ipn-url}") private String ipnUrl;
    public MomoGateway(ObjectMapper mapper) { this.mapper = mapper; }

    @Override public GatewayResult start(PaymentTransaction p) {
        try {
            if (partnerCode.isBlank() || accessKey.isBlank() || secretKey.isBlank())
                return GatewayResult.failed("MoMo credentials are not configured");
            String requestId = p.getPaymentId();
            String orderId = p.getPaymentId();
            long amount = p.getAmount().longValueExact();
            String orderInfo = "Order " + p.getOrderId();
            String extraData = "";
            String requestType = "captureWallet";
            Map<String,Object> body = new LinkedHashMap<>();
            body.put("partnerCode", partnerCode); body.put("requestId", requestId);
            body.put("amount", amount); body.put("orderId", orderId); body.put("orderInfo", orderInfo);
            body.put("redirectUrl", redirectUrl); body.put("ipnUrl", ipnUrl);
            body.put("requestType", requestType); body.put("extraData", extraData); body.put("lang", "vi");
            String signData = "accessKey="+accessKey+"&amount="+amount+"&extraData="+extraData+"&ipnUrl="+ipnUrl+
                "&orderId="+orderId+"&orderInfo="+orderInfo+"&partnerCode="+partnerCode+"&redirectUrl="+redirectUrl+
                "&requestId="+requestId+"&requestType="+requestType;
            body.put("signature", sign(signData));
            String response = http.post().uri(endpoint).contentType(MediaType.APPLICATION_JSON).body(body).retrieve().body(String.class);
            JsonNode json = mapper.readTree(response);
            if (json.path("resultCode").asInt(-1) == 0 && json.hasNonNull("payUrl"))
                return GatewayResult.action(json.get("payUrl").asText());
            return GatewayResult.failed("MoMo rejected request: " + json.path("message").asText("unknown response"));
        } catch (Exception e) {
            return GatewayResult.failed("MoMo request failed: " + safeMessage(e));
        }
    }

    public boolean verifyIpn(com.hoaan.payment.api.MomoIpnRequest r) {
        try {
            String data = "accessKey="+accessKey+"&amount="+r.amount()+"&extraData="+value(r.extraData())+"&message="+value(r.message())+
                "&orderId="+value(r.orderId())+"&orderInfo="+value(r.orderInfo())+"&orderType="+value(r.orderType())+
                "&partnerCode="+value(r.partnerCode())+"&payType="+value(r.payType())+"&requestId="+value(r.requestId())+
                "&responseTime="+r.responseTime()+"&resultCode="+r.resultCode()+"&transId="+r.transId();
            return constantTimeEquals(sign(data), r.signature());
        } catch (Exception e) { return false; }
    }
    private String sign(String data) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        return HexFormat.of().formatHex(mac.doFinal(data.getBytes(StandardCharsets.UTF_8)));
    }
    private static boolean constantTimeEquals(String a, String b) {
        return b != null && java.security.MessageDigest.isEqual(a.getBytes(StandardCharsets.UTF_8), b.getBytes(StandardCharsets.UTF_8));
    }
    private static String value(String s) { return s == null ? "" : s; }
    private static String safeMessage(Exception e) { return e.getMessage() == null ? e.getClass().getSimpleName() : e.getMessage(); }
}
