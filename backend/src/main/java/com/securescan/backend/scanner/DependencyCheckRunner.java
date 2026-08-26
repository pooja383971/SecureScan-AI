package com.securescan.backend.scanner;

import org.springframework.stereotype.Component;

@Component
public class DependencyCheckRunner {

    public void runScan() {

        System.out.println("Running OWASP Dependency Check...");

        // Later we will execute
        // dependency-check.bat
        // using Java ProcessBuilder

    }

}