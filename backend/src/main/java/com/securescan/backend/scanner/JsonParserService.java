package com.securescan.backend.scanner;

import org.springframework.stereotype.Component;

@Component
public class JsonParserService {

    public void readReport() {

        System.out.println("Reading Dependency Check JSON Report...");

        // Later we'll parse dependency-check-report.json
        // and save vulnerabilities into MySQL.

    }

}