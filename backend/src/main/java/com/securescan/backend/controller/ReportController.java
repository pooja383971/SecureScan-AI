
package com.securescan.backend.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.securescan.backend.dto.WebsiteScanResponse;
import com.securescan.backend.entity.Scan;
import com.securescan.backend.service.PdfReportService;
import com.securescan.backend.service.ScanService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "https://secure-scan-ai-psi.vercel.app")
public class ReportController {

    private final ScanService scanService;
    private final PdfReportService pdfReportService;

    public ReportController(ScanService scanService,
                            PdfReportService pdfReportService) {

        this.scanService = scanService;
        this.pdfReportService = pdfReportService;

    }

    // Get all reports
    @GetMapping
    public List<Scan> getReports() {

        return scanService.getAllScans();

    }

    // Get report by ID
    @GetMapping("/{id}")
    public Scan getReport(@PathVariable Long id) {

        return scanService.getScan(id);

    }

    // Download Website PDF Report
    @PostMapping("/website/pdf")
    public ResponseEntity<byte[]> downloadWebsiteReport(
            @RequestBody WebsiteScanResponse report) {

        byte[] pdf = pdfReportService.generateWebsiteReport(report);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Website_Report.pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);

    }

}