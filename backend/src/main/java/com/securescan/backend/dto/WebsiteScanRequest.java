package com.securescan.backend.dto;

public class WebsiteScanRequest {

    private String url;

    public WebsiteScanRequest() {
    }

    public WebsiteScanRequest(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}