package com.securescan.backend.report;

import org.springframework.stereotype.Component;

@Component
public class PdfGenerator {

    public String generatePdf(String projectName) {

        // Later we will generate a real PDF using PDFBox

        return "PDF Report Generated Successfully for " + projectName;

    }

}