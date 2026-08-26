// // // // package com.securescan.backend.controller;

// // // // import com.securescan.backend.service.ReportService;
// // // // import org.springframework.web.bind.annotation.*;

// // // // @RestController
// // // // @RequestMapping("/api/report")
// // // // public class ReportController {

// // // //     private final ReportService reportService;

// // // //     public ReportController(ReportService reportService) {
// // // //         this.reportService = reportService;
// // // //     }

// // // //     @GetMapping("/generate/{projectName}")
// // // //     public String generate(@PathVariable String projectName) {

// // // //         return reportService.generateReport(projectName);

// // // //     }

// // // //     @GetMapping("/download/{id}")
// // // //     public String download(@PathVariable Long id) {

// // // //         return reportService.downloadReport(id);

// // // //     }

// // // // }
// // // package com.securescan.backend.controller;

// // // import com.securescan.backend.entity.Report;
// // // import com.securescan.backend.service.ReportService;

// // // import org.springframework.beans.factory.annotation.Autowired;
// // // import org.springframework.web.bind.annotation.*;

// // // import java.util.List;

// // // @RestController
// // // @RequestMapping("/api/reports")
// // // @CrossOrigin(origins = "http://localhost:5173")
// // // public class ReportController {

// // //     @Autowired
// // //     private ReportService reportService;

// // //     @GetMapping
// // //     public List<Report> getReports() {
// // //         return reportService.getAllReports();
// // //     }

// // //     @GetMapping("/{id}")
// // //     public Report getReport(@PathVariable Long id) {
// // //         return reportService.getReport(id);
// // //     }

// // //     @PostMapping
// // //     public Report createReport(@RequestBody Report report) {
// // //         return reportService.saveReport(report);
// // //     }

// // //     @PutMapping("/{id}")
// // //     public Report updateReport(@PathVariable Long id,
// // //                                @RequestBody Report report) {

// // //         Report existing = reportService.getReport(id);

// // //         if (existing == null) {
// // //             return null;
// // //         }

// // //         existing.setTarget(report.getTarget());
// // //         existing.setScanType(report.getScanType());
// // //         existing.setCritical(report.getCritical());
// // //         existing.setHigh(report.getHigh());
// // //         existing.setMedium(report.getMedium());
// // //         existing.setLow(report.getLow());
// // //         existing.setSummary(report.getSummary());

// // //         return reportService.saveReport(existing);
// // //     }

// // //     @DeleteMapping("/{id}")
// // //     public void deleteReport(@PathVariable Long id) {
// // //         reportService.deleteReport(id);
// // //     }
// // // }
// // package com.securescan.controller;

// // import com.securescan.entity.Scan;
// // import com.securescan.repository.ScanRepository;
// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.web.bind.annotation.*;

// // import java.util.List;

// // @RestController
// // @RequestMapping("/api")
// // @CrossOrigin(origins = "*")
// // public class ReportController {

// //     @Autowired
// //     private ScanRepository scanRepository;

// //     @GetMapping("/reports")
// //     public List<Scan> getReports() {
// //         return scanRepository.findAll();
// //     }
// // }
// // package com.securescan.controller;

// // import com.securescan.entity.Scan;
// // import com.securescan.repository.ScanRepository;
// // import org.springframework.web.bind.annotation.*;
// // import java.util.List;

// // @RestController
// // @RequestMapping("/api")
// // @CrossOrigin(origins = "*")
// // public class ReportController {

// //     private final ScanRepository scanRepository;

// //     public ReportController(ScanRepository scanRepository) {
// //         this.scanRepository = scanRepository;
// //     }

// //     @GetMapping("/reports")
// //     public List<Scan> getReports() {
// //         return scanRepository.findAll();
// //     }
// // }
// package com.securescan.backend.controller;

// import com.securescan.backend.entity.Scan;
// import com.securescan.backend.service.ScanService;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/reports")
// @CrossOrigin(origins = "http://localhost:5173")
// public class ReportController {

//     private final ScanService scanService;

//     public ReportController(ScanService scanService) {
//         this.scanService = scanService;
//     }

//     @GetMapping
//     public List<Scan> getReports() {
//         return scanService.getAllScans();
//     }

//     @GetMapping("/{id}")
//     public Scan getReport(@PathVariable Long id) {
//         return scanService.getScan(id);
//     }
// }
package com.securescan.backend.controller;

import com.securescan.backend.dto.WebsiteScanResponse;
import com.securescan.backend.entity.Scan;
import com.securescan.backend.service.PdfReportService;
import com.securescan.backend.service.ScanService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    private final ScanService scanService;
    private final PdfReportService pdfReportService;

    public ReportController(ScanService scanService,
                            PdfReportService pdfReportService) {

        this.scanService = scanService;
        this.pdfReportService = pdfReportService;

    }

    // Get all reports
    @GetMapping
    public List<Scan> getReports() {

        return scanService.getAllScans();

    }

    // Get report by ID
    @GetMapping("/{id}")
    public Scan getReport(@PathVariable Long id) {

        return scanService.getScan(id);

    }

    // Download Website PDF Report
    @PostMapping("/website/pdf")
    public ResponseEntity<byte[]> downloadWebsiteReport(
            @RequestBody WebsiteScanResponse report) {

        byte[] pdf = pdfReportService.generateWebsiteReport(report);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Website_Report.pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);

    }

}