package com.securescan.backend.service;

import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    public String dashboardSummary() {
        return "Dashboard Summary";
    }

}