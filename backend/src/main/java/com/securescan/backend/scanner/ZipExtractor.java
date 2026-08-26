package com.securescan.backend.scanner;

import org.springframework.stereotype.Component;

@Component
public class ZipExtractor {

    public void extract(String zipPath) {

        System.out.println("Extracting ZIP File...");

        System.out.println(zipPath);

    }

}