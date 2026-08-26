// package com.securescan.backend.dto;

// public class WebsiteScanResponse {

//     private String website;
//     private String ssl;
//     private String headers;
//     private String https;
//     private String dns;
//     private String risk;
//     private int score;

//     public WebsiteScanResponse() {
//     }

//     public WebsiteScanResponse(
//             String website,
//             String ssl,
//             String headers,
//             String https,
//             String dns,
//             String risk,
//             int score) {

//         this.website = website;
//         this.ssl = ssl;
//         this.headers = headers;
//         this.https = https;
//         this.dns = dns;
//         this.risk = risk;
//         this.score = score;
//     }

//     public String getWebsite() {
//         return website;
//     }

//     public void setWebsite(String website) {
//         this.website = website;
//     }

//     public String getSsl() {
//         return ssl;
//     }

//     public void setSsl(String ssl) {
//         this.ssl = ssl;
//     }

//     public String getHeaders() {
//         return headers;
//     }

//     public void setHeaders(String headers) {
//         this.headers = headers;
//     }

//     public String getHttps() {
//         return https;
//     }

//     public void setHttps(String https) {
//         this.https = https;
//     }

//     public String getDns() {
//         return dns;
//     }

//     public void setDns(String dns) {
//         this.dns = dns;
//     }

//     public String getRisk() {
//         return risk;
//     }

//     public void setRisk(String risk) {
//         this.risk = risk;
//     }

//     public int getScore() {
//         return score;
//     }

//     public void setScore(int score) {
//         this.score = score;
//     }
// }
package com.securescan.backend.dto;

public class WebsiteScanResponse {

    private String website;
    private String ssl;
    private String https;
    private String dns;
    private String headers;
    private String risk;
    private int score;

    public WebsiteScanResponse() {
    }

    public WebsiteScanResponse(
            String website,
            String ssl,
            String https,
            String dns,
            String headers,
            String risk,
            int score) {

        this.website = website;
        this.ssl = ssl;
        this.https = https;
        this.dns = dns;
        this.headers = headers;
        this.risk = risk;
        this.score = score;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getSsl() {
        return ssl;
    }

    public void setSsl(String ssl) {
        this.ssl = ssl;
    }

    public String getHttps() {
        return https;
    }

    public void setHttps(String https) {
        this.https = https;
    }

    public String getDns() {
        return dns;
    }

    public void setDns(String dns) {
        this.dns = dns;
    }

    public String getHeaders() {
        return headers;
    }

    public void setHeaders(String headers) {
        this.headers = headers;
    }

    public String getRisk() {
        return risk;
    }

    public void setRisk(String risk) {
        this.risk = risk;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    @Override
    public String toString() {
        return "WebsiteScanResponse{" +
                "website='" + website + '\'' +
                ", ssl='" + ssl + '\'' +
                ", https='" + https + '\'' +
                ", dns='" + dns + '\'' +
                ", headers='" + headers + '\'' +
                ", risk='" + risk + '\'' +
                ", score=" + score +
                '}';
    }
}