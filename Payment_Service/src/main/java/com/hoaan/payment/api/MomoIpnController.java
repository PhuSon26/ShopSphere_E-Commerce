package com.hoaan.payment.api;

import com.hoaan.payment.service.MomoIpnService;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments/momo")
@ConditionalOnProperty(name="app.gateway", havingValue="momo")
public class MomoIpnController {
    private final MomoIpnService ipn;
    public MomoIpnController(MomoIpnService ipn) { this.ipn=ipn; }
    @PostMapping("/ipn")
    public ResponseEntity<Void> receive(@RequestBody MomoIpnRequest request) { ipn.accept(request); return ResponseEntity.ok().build(); }
}
