// package com.securescan.backend.dto;

// public class ApkScanResponse {

//     private String packageName;
//     private String certificate;
//     private int permissions;
//     private String malware;
//     private String risk;

//     public ApkScanResponse() {
//     }

//     public ApkScanResponse(String packageName,
//                            String certificate,
//                            int permissions,
//                            String malware,
//                            String risk) {

//         this.packageName = packageName;
//         this.certificate = certificate;
//         this.permissions = permissions;
//         this.malware = malware;
//         this.risk = risk;
//     }

//     public String getPackageName() {
//         return packageName;
//     }

//     public void setPackageName(String packageName) {
//         this.packageName = packageName;
//     }

//     public String getCertificate() {
//         return certificate;
//     }

//     public void setCertificate(String certificate) {
//         this.certificate = certificate;
//     }

//     public int getPermissions() {
//         return permissions;
//     }

//     public void setPermissions(int permissions) {
//         this.permissions = permissions;
//     }

//     public String getMalware() {
//         return malware;
//     }

//     public void setMalware(String malware) {
//         this.malware = malware;
//     }

//     public String getRisk() {
//         return risk;
//     }

//     public void setRisk(String risk) {
//         this.risk = risk;
//     }
// }
package com.securescan.backend.dto;

public class ApkScanResponse {

    private String packageName;
    private String certificate;
    private int permissions;
    private String malware;
    private String risk;

    public ApkScanResponse() {
    }

    public ApkScanResponse(String packageName,
                           String certificate,
                           int permissions,
                           String malware,
                           String risk) {

        this.packageName = packageName;
        this.certificate = certificate;
        this.permissions = permissions;
        this.malware = malware;
        this.risk = risk;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getCertificate() {
        return certificate;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }

    public int getPermissions() {
        return permissions;
    }

    public void setPermissions(int permissions) {
        this.permissions = permissions;
    }

    public String getMalware() {
        return malware;
    }

    public void setMalware(String malware) {
        this.malware = malware;
    }

    public String getRisk() {
        return risk;
    }

    public void setRisk(String risk) {
        this.risk = risk;
    }

    @Override
    public String toString() {
        return "ApkScanResponse{" +
                "packageName='" + packageName + '\'' +
                ", certificate='" + certificate + '\'' +
                ", permissions=" + permissions +
                ", malware='" + malware + '\'' +
                ", risk='" + risk + '\'' +
                '}';
    }
}