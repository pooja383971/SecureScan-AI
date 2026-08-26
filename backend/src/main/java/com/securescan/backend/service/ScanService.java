// package com.securescan.backend.service;

// import com.securescan.backend.entity.Scan;
// import com.securescan.backend.repository.ScanRepository;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.List;

// @Service
// public class ScanService {

//     private final ScanRepository repository;

//     public ScanService(ScanRepository repository) {
//         this.repository = repository;
//     }

//     public List<Scan> getAllScans() {
//         return repository.findAll();
//     }

//     public Scan getScan(Long id) {
//         return repository.findById(id).orElse(null);
//     }

//     public Scan saveScan(Scan scan) {

//         // Always use server time
//         scan.setScanDate(LocalDateTime.now());
//         scan.setUploadedAt(LocalDateTime.now());

//         scan.setStatus("Completed");

//         if (scan.getCritical() == null) scan.setCritical(0);
//         if (scan.getHigh() == null) scan.setHigh(0);
//         if (scan.getMedium() == null) scan.setMedium(0);
//         if (scan.getLow() == null) scan.setLow(0);

//         scan.setTotalVulnerabilities(
//                 scan.getCritical()
//                         + scan.getHigh()
//                         + scan.getMedium()
//                         + scan.getLow()
//         );

//         return repository.save(scan);
//     }

//     public void deleteScan(Long id) {
//         repository.deleteById(id);
//     }
// }
// package com.securescan.backend.service;

// import com.securescan.backend.entity.Scan;
// import com.securescan.backend.repository.ScanRepository;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.List;

// @Service
// public class ScanService {

//     private final ScanRepository repository;

//     public ScanService(ScanRepository repository) {
//         this.repository = repository;
//     }

//     public List<Scan> getAllScans() {
//         return repository.findAll();
//     }

//     public Scan getScan(Long id) {
//         return repository.findById(id).orElse(null);
//     }

//     public Scan saveScan(Scan scan) {

//         // Check what time Java is using
//         System.out.println("Current Time = " + LocalDateTime.now());

//         scan.setScanDate(LocalDateTime.now());
//         scan.setUploadedAt(LocalDateTime.now());

//         if (scan.getStatus() == null || scan.getStatus().isBlank()) {
//             scan.setStatus("Completed");
//         }

//         return repository.save(scan);
//     }

//     public void deleteScan(Long id) {
//         repository.deleteById(id);
//     }
// }
package com.securescan.backend.service;

import com.securescan.backend.entity.Scan;
import com.securescan.backend.repository.ScanRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScanService {

    private final ScanRepository repository;

    public ScanService(ScanRepository repository) {
        this.repository = repository;
    }

    public List<Scan> getAllScans() {
        return repository.findAll();
    }

    public Scan getScan(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Scan saveScan(Scan scan) {

        try {

            System.out.println("========== NEW SCAN ==========");
            System.out.println("Project Name : " + scan.getProjectName());
            System.out.println("File Name    : " + scan.getFileName());
            System.out.println("Scan Type    : " + scan.getScanType());
            System.out.println("Status       : " + scan.getStatus());

            scan.setScanDate(LocalDateTime.now());
            scan.setUploadedAt(LocalDateTime.now());

            if (scan.getStatus() == null || scan.getStatus().isBlank()) {
                scan.setStatus("Completed");
            }

            Scan savedScan = repository.save(scan);

            System.out.println("Scan saved successfully. ID = " + savedScan.getId());

            return savedScan;

        } catch (Exception e) {

            System.err.println("ERROR SAVING SCAN");
            e.printStackTrace();

            throw new RuntimeException("Failed to save scan: " + e.getMessage());

        }

    }

    public void deleteScan(Long id) {
        repository.deleteById(id);
    }

}