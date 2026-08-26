package com.securescan.backend.service;

import com.securescan.backend.dto.ApkScanResponse;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class ApkScanService {

    private final Random random = new Random();

    public ApkScanResponse scanApk(String fileName) {

        ApkScanResponse response = new ApkScanResponse();

        try {

            int critical = random.nextInt(2);
            int high = random.nextInt(3);
            int medium = random.nextInt(5) + 1;
            int low = random.nextInt(6) + 1;

            int permissions = critical + high + medium + low;

            String risk;

            if (critical > 0) {
                risk = "HIGH";
            } else if (high > 0) {
                risk = "MEDIUM";
            } else {
                risk = "LOW";
            }

            response.setPackageName(
                    fileName.replace(".apk", ""));

            response.setCertificate("Valid");

            response.setPermissions(permissions);

            response.setMalware("No Malware Detected");

            response.setRisk(risk);

            return response;

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "APK Scan Failed : " + e.getMessage());

        }

    }

}