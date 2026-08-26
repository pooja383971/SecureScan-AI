package com.securescan.backend.scanner;

import org.springframework.stereotype.Service;

@Service
public class ScannerService {

    private final ZipExtractor zipExtractor;
    private final DependencyCheckRunner dependencyCheckRunner;
    private final JsonParserService jsonParserService;

    public ScannerService(
            ZipExtractor zipExtractor,
            DependencyCheckRunner dependencyCheckRunner,
            JsonParserService jsonParserService) {

        this.zipExtractor = zipExtractor;
        this.dependencyCheckRunner = dependencyCheckRunner;
        this.jsonParserService = jsonParserService;
    }

    public String startScan(String zipFilePath) {

        zipExtractor.extract(zipFilePath);

        dependencyCheckRunner.runScan();

        jsonParserService.readReport();

        return "Scan Completed Successfully";

    }

}