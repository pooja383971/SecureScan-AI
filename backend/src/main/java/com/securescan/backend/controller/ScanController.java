
package com.securescan.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.securescan.backend.entity.Scan;
import com.securescan.backend.service.ScanService;

@RestController
@RequestMapping("/api/scans")
@CrossOrigin(origins = "https://secure-scan-ai-psi.vercel.app")
public class ScanController {

    private final ScanService scanService;

    public ScanController(ScanService scanService) {
        this.scanService = scanService;
    }

    @PostMapping
    public ResponseEntity<?> saveScan(@RequestBody Scan scan) {

        try {

            Scan savedScan = scanService.saveScan(scan);

            return ResponseEntity.ok(savedScan);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());

        }

    }

    @GetMapping
    public ResponseEntity<List<Scan>> getAllScans() {

        return ResponseEntity.ok(scanService.getAllScans());

    }

    @GetMapping("/{id}")
    public ResponseEntity<Scan> getScan(@PathVariable Long id) {

        return ResponseEntity.ok(scanService.getScan(id));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteScan(@PathVariable Long id) {

        scanService.deleteScan(id);

        return ResponseEntity.ok("Scan deleted successfully.");

    }

}