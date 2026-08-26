
package com.securescan.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.securescan.backend.dto.WebsiteScanRequest;
import com.securescan.backend.dto.WebsiteScanResponse;
import com.securescan.backend.service.WebsiteScanService;

@RestController
@RequestMapping("/api/website")
@CrossOrigin(origins = "https://secure-scan-ai-psi.vercel.app")
public class WebsiteScanController {

    private final WebsiteScanService websiteScanService;

    public WebsiteScanController(WebsiteScanService websiteScanService) {
        this.websiteScanService = websiteScanService;
    }

    @PostMapping("/scan")
    public WebsiteScanResponse scanWebsite(
            @RequestBody WebsiteScanRequest request) {

        if (request == null || request.getUrl() == null || request.getUrl().trim().isEmpty()) {
            throw new IllegalArgumentException("Website URL cannot be empty.");
        }

        return websiteScanService.scanWebsite(request.getUrl().trim());
    }
}