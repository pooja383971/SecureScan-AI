package com.securescan.backend.dto;

import lombok.Data;

@Data
public class ScanResponse {

    private Long scanId;
    private String projectName;
    private String status;
    private int critical;
    private int high;
    private int medium;
    private int low;

}