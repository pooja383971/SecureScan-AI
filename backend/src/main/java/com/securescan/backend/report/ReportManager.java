package com.securescan.backend.report;

import org.springframework.stereotype.Service;

@Service
public class ReportManager {

    private final PdfGenerator pdfGenerator;

    public ReportManager(PdfGenerator pdfGenerator) {
        this.pdfGenerator = pdfGenerator;
    }

    public String createReport(String projectName) {

        return pdfGenerator.generatePdf(projectName);

    }

}