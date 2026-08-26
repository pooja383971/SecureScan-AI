package com.securescan.backend.dto;

import lombok.Data;

@Data
public class DashboardResponse {

    private long totalScans;
    private long totalUsers;
    private int critical;
    private int high;
    private int medium;
    private int low;

}