// package com.securescan.backend.controller;

// import com.securescan.backend.entity.Scan;
// import com.securescan.backend.service.ScanService;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/scans")
// @CrossOrigin(origins = "http://localhost:5173")
// public class ScanController {

//     private final ScanService scanService;

//     public ScanController(ScanService scanService) {
//         this.scanService = scanService;
//     }

//     @PostMapping
//     public Scan saveScan(@RequestBody Scan scan) {
//         return scanService.saveScan(scan);
//     }

//     @GetMapping
//     public List<Scan> getAllScans() {
//         return scanService.getAllScans();
//     }

//     @GetMapping("/{id}")
//     public Scan getScan(@PathVariable Long id) {
//         return scanService.getScan(id);
//     }

//     @DeleteMapping("/{id}")
//     public void deleteScan(@PathVariable Long id) {
//         scanService.deleteScan(id);
//     }
// }
package com.securescan.backend.controller;

import com.securescan.backend.entity.Scan;
import com.securescan.backend.service.ScanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scans")
@CrossOrigin(origins = "http://localhost:5173")
public class ScanController {

    private final ScanService scanService;

    public ScanController(ScanService scanService) {
        this.scanService = scanService;
    }

    @PostMapping
    public ResponseEntity<?> saveScan(@RequestBody Scan scan) {

        try {

            Scan savedScan = scanService.saveScan(scan);

            return ResponseEntity.ok(savedScan);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());

        }

    }

    @GetMapping
    public ResponseEntity<List<Scan>> getAllScans() {

        return ResponseEntity.ok(scanService.getAllScans());

    }

    @GetMapping("/{id}")
    public ResponseEntity<Scan> getScan(@PathVariable Long id) {

        return ResponseEntity.ok(scanService.getScan(id));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteScan(@PathVariable Long id) {

        scanService.deleteScan(id);

        return ResponseEntity.ok("Scan deleted successfully.");

    }

}