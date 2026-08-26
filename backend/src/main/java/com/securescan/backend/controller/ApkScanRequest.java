package com.securescan.backend.dto;

public class ApkScanRequest {

    private String fileName;

    public ApkScanRequest() {
    }

    public ApkScanRequest(String fileName) {
        this.fileName = fileName;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}