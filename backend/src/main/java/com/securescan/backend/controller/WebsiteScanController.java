// package com.securescan.backend.controller;

// import com.securescan.backend.dto.WebsiteScanRequest;
// import com.securescan.backend.dto.WebsiteScanResponse;
// import com.securescan.backend.service.WebsiteScanService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/website")
// @CrossOrigin(origins = "http://localhost:5173")
// public class WebsiteScanController {

//     @Autowired
//     private WebsiteScanService websiteScanService;

//     @PostMapping("/scan")
//     public WebsiteScanResponse scanWebsite(
//             @RequestBody WebsiteScanRequest request) {

//         return websiteScanService.scanWebsite(request.getUrl());

//     }

// }
package com.securescan.backend.controller;

import com.securescan.backend.dto.WebsiteScanRequest;
import com.securescan.backend.dto.WebsiteScanResponse;
import com.securescan.backend.service.WebsiteScanService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/website")
@CrossOrigin(origins = "http://localhost:5173")
public class WebsiteScanController {

    private final WebsiteScanService websiteScanService;

    public WebsiteScanController(WebsiteScanService websiteScanService) {
        this.websiteScanService = websiteScanService;
    }

    @PostMapping("/scan")
    public WebsiteScanResponse scanWebsite(
            @RequestBody WebsiteScanRequest request) {

        if (request == null || request.getUrl() == null || request.getUrl().trim().isEmpty()) {
            throw new IllegalArgumentException("Website URL cannot be empty.");
        }

        return websiteScanService.scanWebsite(request.getUrl().trim());
    }
}