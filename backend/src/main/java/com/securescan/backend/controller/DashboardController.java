package com.securescan.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.securescan.backend.entity.Scan;
import com.securescan.backend.repository.ScanRepository;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "https://secure-scan-ai-psi.vercel.app")
public class DashboardController {

    private final ScanRepository scanRepository;

    public DashboardController(ScanRepository scanRepository) {
        this.scanRepository = scanRepository;
    }

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {

        List<Scan> scans = scanRepository.findAll();

        int totalScans = scans.size();

        int critical = 0;
        int high = 0;
        int medium = 0;
        int low = 0;

        for (Scan scan : scans) {

            critical += scan.getCritical() == null ? 0 : scan.getCritical();
            high += scan.getHigh() == null ? 0 : scan.getHigh();
            medium += scan.getMedium() == null ? 0 : scan.getMedium();
            low += scan.getLow() == null ? 0 : scan.getLow();

        }

        Map<String, Object> response = new HashMap<>();

        response.put("totalScans", totalScans);
        response.put("critical", critical);
        response.put("high", high);
        response.put("medium", medium);
        response.put("low", low);

        return response;
    }
}