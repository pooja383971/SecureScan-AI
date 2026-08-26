// package com.securescan.backend.controller;

// import com.securescan.backend.dto.ApkScanRequest;
// import com.securescan.backend.dto.ApkScanResponse;
// import com.securescan.backend.service.ApkScanService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/apk")
// @CrossOrigin(origins = "http://localhost:5173")
// public class ApkScanController {

//     @Autowired
//     private ApkScanService apkScanService;

//     @PostMapping("/scan")
//     public ApkScanResponse scanApk(
//             @RequestBody ApkScanRequest request) {

//         return apkScanService.scanApk(request.getFileName());

//     }

// }
package com.securescan.backend.controller;

import com.securescan.backend.dto.ApkScanRequest;
import com.securescan.backend.dto.ApkScanResponse;
import com.securescan.backend.service.ApkScanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/apk")
@CrossOrigin(origins = "http://localhost:5173")
public class ApkScanController {

    private final ApkScanService apkScanService;

    public ApkScanController(ApkScanService apkScanService) {
        this.apkScanService = apkScanService;
    }

    @PostMapping("/scan")
    public ResponseEntity<?> scanApk(@RequestBody ApkScanRequest request) {

        try {

            if (request == null ||
                request.getFileName() == null ||
                request.getFileName().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("APK file name is required.");
            }

            ApkScanResponse response =
                    apkScanService.scanApk(request.getFileName());

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("APK Scan Failed : " + e.getMessage());
        }
    }
}