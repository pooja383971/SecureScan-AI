
// package com.securescan.backend.entity;
// import jakarta.persistence.*;
// import java.time.LocalDateTime;

// @Entity
// @Table(name = "scans")
// public class Scan {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private Integer critical;
//     private Integer high;
//     private Integer medium;
//     private Integer low;

//     @Column(name = "total_vulnerabilities")
//     private Integer totalVulnerabilities;

//     @Column(name = "file_name")
//     private String fileName;

//     @Column(name = "project_name")
//     private String projectName;

//     @Column(name = "scan_date")
//     private LocalDateTime scanDate;

//     private String status;

//     @Column(name = "scan_type")
//     private String scanType;

//     @Column(name = "uploaded_at")
//     private LocalDateTime uploadedAt;

//     @Column(name = "user_id")
//     private Long userId;

//     public Scan() {
//     }

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public Integer getCritical() {
//         return critical;
//     }

//     public void setCritical(Integer critical) {
//         this.critical = critical;
//     }

//     public Integer getHigh() {
//         return high;
//     }

//     public void setHigh(Integer high) {
//         this.high = high;
//     }

//     public Integer getMedium() {
//         return medium;
//     }

//     public void setMedium(Integer medium) {
//         this.medium = medium;
//     }

//     public Integer getLow() {
//         return low;
//     }

//     public void setLow(Integer low) {
//         this.low = low;
//     }

//     public Integer getTotalVulnerabilities() {
//         return totalVulnerabilities;
//     }

//     public void setTotalVulnerabilities(Integer totalVulnerabilities) {
//         this.totalVulnerabilities = totalVulnerabilities;
//     }

//     public String getFileName() {
//         return fileName;
//     }

//     public void setFileName(String fileName) {
//         this.fileName = fileName;
//     }

//     public String getProjectName() {
//         return projectName;
//     }

//     public void setProjectName(String projectName) {
//         this.projectName = projectName;
//     }

//     public LocalDateTime getScanDate() {
//         return scanDate;
//     }

//     public void setScanDate(LocalDateTime scanDate) {
//         this.scanDate = scanDate;
//     }

//     public String getStatus() {
//         return status;
//     }

//     public void setStatus(String status) {
//         this.status = status;
//     }

//     public String getScanType() {
//         return scanType;
//     }

//     public void setScanType(String scanType) {
//         this.scanType = scanType;
//     }

//     public LocalDateTime getUploadedAt() {
//         return uploadedAt;
//     }

//     public void setUploadedAt(LocalDateTime uploadedAt) {
//         this.uploadedAt = uploadedAt;
//     }

//     public Long getUserId() {
//         return userId;
//     }

//     public void setUserId(Long userId) {
//         this.userId = userId;
//     }
// }
package com.securescan.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "scans")
public class Scan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer critical = 0;

    @Column(nullable = false)
    private Integer high = 0;

    @Column(nullable = false)
    private Integer medium = 0;

    @Column(nullable = false)
    private Integer low = 0;

    @Column(name = "total_vulnerabilities")
    private Integer totalVulnerabilities = 0;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "scan_date")
    private LocalDateTime scanDate;

    private String status;

    @Column(name = "scan_type")
    private String scanType;

    @Column(name = "uploaded_at")
    private LocalDateTime uploadedAt;

    @Column(name = "user_id")
    private Long userId;

    public Scan() {
    }

    @PrePersist
    @PreUpdate
    public void calculateTotal() {

        int c = critical == null ? 0 : critical;
        int h = high == null ? 0 : high;
        int m = medium == null ? 0 : medium;
        int l = low == null ? 0 : low;

        totalVulnerabilities = c + h + m + l;

        if (scanDate == null) {
            scanDate = LocalDateTime.now();
        }

        if (uploadedAt == null) {
            uploadedAt = LocalDateTime.now();
        }

        if (status == null || status.isBlank()) {
            status = "Completed";
        }

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCritical() {
        return critical;
    }

    public void setCritical(Integer critical) {
        this.critical = critical;
    }

    public Integer getHigh() {
        return high;
    }

    public void setHigh(Integer high) {
        this.high = high;
    }

    public Integer getMedium() {
        return medium;
    }

    public void setMedium(Integer medium) {
        this.medium = medium;
    }

    public Integer getLow() {
        return low;
    }

    public void setLow(Integer low) {
        this.low = low;
    }

    public Integer getTotalVulnerabilities() {
        return totalVulnerabilities;
    }

    public void setTotalVulnerabilities(Integer totalVulnerabilities) {
        this.totalVulnerabilities = totalVulnerabilities;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public LocalDateTime getScanDate() {
        return scanDate;
    }

    public void setScanDate(LocalDateTime scanDate) {
        this.scanDate = scanDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getScanType() {
        return scanType;
    }

    public void setScanType(String scanType) {
        this.scanType = scanType;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}