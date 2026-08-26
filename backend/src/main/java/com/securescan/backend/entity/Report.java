// package com.securescan.backend.entity;

// import jakarta.persistence.*;
// import lombok.*;

// @Entity
// @Table(name = "reports")
// @Getter
// @Setter
// @NoArgsConstructor
// @AllArgsConstructor
// @Builder
// public class Report {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String reportName;

//     private String reportPath;

//     @OneToOne
//     @JoinColumn(name = "scan_id")
//     private Scan scan;

// }
package com.securescan.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String target;

    private String scanType;

    private int critical;

    private int high;

    private int medium;

    private int low;

    @Column(length = 5000)
    private String summary;

    private LocalDateTime generatedAt;

    public Report() {
        this.generatedAt = LocalDateTime.now();
    }

    public Report(String target,
                  String scanType,
                  int critical,
                  int high,
                  int medium,
                  int low,
                  String summary) {

        this.target = target;
        this.scanType = scanType;
        this.critical = critical;
        this.high = high;
        this.medium = medium;
        this.low = low;
        this.summary = summary;
        this.generatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getScanType() {
        return scanType;
    }

    public void setScanType(String scanType) {
        this.scanType = scanType;
    }

    public int getCritical() {
        return critical;
    }

    public void setCritical(int critical) {
        this.critical = critical;
    }

    public int getHigh() {
        return high;
    }

    public void setHigh(int high) {
        this.high = high;
    }

    public int getMedium() {
        return medium;
    }

    public void setMedium(int medium) {
        this.medium = medium;
    }

    public int getLow() {
        return low;
    }

    public void setLow(int low) {
        this.low = low;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }
}