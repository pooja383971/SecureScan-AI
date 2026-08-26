// package com.securescan.backend.service;

// import com.securescan.backend.dto.WebsiteScanResponse;
// import com.securescan.backend.entity.Scan;
// import com.securescan.backend.repository.ScanRepository;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.Random;

// @Service
// public class WebsiteScanService {

//     private final ScanRepository scanRepository;
//     private final Random random = new Random();

//     public WebsiteScanService(ScanRepository scanRepository) {
//         this.scanRepository = scanRepository;
//     }

//     public WebsiteScanResponse scanWebsite(String url) {

//         if (url == null || url.trim().isEmpty()) {
//             throw new RuntimeException("Website URL cannot be empty.");
//         }

//         try {

//             String website = url
//                     .replace("https://", "")
//                     .replace("http://", "")
//                     .trim();

//             int critical = random.nextInt(2);
//             int high = random.nextInt(3);
//             int medium = random.nextInt(5) + 1;
//             int low = random.nextInt(8) + 1;

//             int total = critical + high + medium + low;

//             Scan scan = new Scan();

//             scan.setProjectName(website);
//             scan.setFileName(website);
//             scan.setScanType("WEBSITE");

//             scan.setCritical(critical);
//             scan.setHigh(high);
//             scan.setMedium(medium);
//             scan.setLow(low);

//             scan.setTotalVulnerabilities(total);

//             scan.setStatus("Completed");
//             scan.setUserId(1L);

//             scan.setScanDate(LocalDateTime.now());
//             scan.setUploadedAt(LocalDateTime.now());

//             System.out.println("Saving Website Scan...");

//             Scan savedScan = scanRepository.save(scan);

//             System.out.println("Saved Successfully. Scan ID : " + savedScan.getId());

//             WebsiteScanResponse response = new WebsiteScanResponse();

//             response.setWebsite(url);
//             response.setSsl("Valid");
//             response.setHttps("Enabled");
//             response.setDns("Working");
//             response.setHeaders("8/10");

//             if (critical > 0) {
//                 response.setRisk("HIGH");
//                 response.setScore(55);
//             } else if (high > 0) {
//                 response.setRisk("MEDIUM");
//                 response.setScore(75);
//             } else {
//                 response.setRisk("LOW");
//                 response.setScore(95);
//             }

//             return response;

//         } catch (Exception e) {

//             System.out.println("=========== WEBSITE SCAN ERROR ===========");
//             e.printStackTrace();
//             System.out.println("==========================================");

//             throw new RuntimeException("Website Scan Failed : " + e.getMessage());
//         }
//     }
// }
package com.securescan.backend.service;

import com.securescan.backend.dto.WebsiteScanResponse;
import org.springframework.stereotype.Service;

@Service
public class WebsiteScanService {

    public WebsiteScanResponse scanWebsite(String url) {

        WebsiteScanResponse response = new WebsiteScanResponse();

        response.setWebsite(url);
        response.setSsl("Valid");
        response.setHttps("Enabled");
        response.setDns("OK");
        response.setHeaders("8/10");
        response.setRisk("LOW");
        response.setScore(95);

        return response;
    }
}