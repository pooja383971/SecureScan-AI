package com.securescan.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.securescan.backend.dto.ApkScanRequest;
import com.securescan.backend.dto.ApkScanResponse;
import com.securescan.backend.service.ApkScanService;

@RestController
@RequestMapping("/api/apk")
@CrossOrigin(origins = "https://secure-scan-ai-psi.vercel.app")
public class ApkScanController {

    private final ApkScanService apkScanService;

    public ApkScanController(ApkScanService apkScanService) {
        this.apkScanService = apkScanService;
    }

    @PostMapping("/scan")
    public ResponseEntity<?> scanApk(@RequestBody ApkScanRequest request) {

        try {

            if (request == null ||
                request.getFileName() == null ||
                request.getFileName().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("APK file name is required.");
            }

            ApkScanResponse response =
                    apkScanService.scanApk(request.getFileName());

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("APK Scan Failed : " + e.getMessage());
        }
    }
}