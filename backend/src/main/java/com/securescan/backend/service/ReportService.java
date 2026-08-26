// // package com.securescan.backend.service;

// // import org.springframework.stereotype.Service;

// // @Service
// // public class ReportService {

// //     public String generateReport() {
// //         return "PDF Report Generated";
// //     }

// //     public String downloadReport(Long id) {
// //         return "Downloading Report : " + id;
// //     }

// // }
// package com.securescan.backend.service;

// import com.securescan.backend.report.ReportManager;
// import org.springframework.stereotype.Service;

// @Service
// public class ReportService {

//     private final ReportManager reportManager;

//     public ReportService(ReportManager reportManager) {
//         this.reportManager = reportManager;
//     }

//     public String generateReport(String projectName) {

//         return reportManager.createReport(projectName);

//     }

//     public String downloadReport(Long id) {

//         return "Downloading Report : " + id;

//     }

// }
package com.securescan.backend.service;

import com.securescan.backend.entity.Report;
import com.securescan.backend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository repository;

    public List<Report> getAllReports() {
        return repository.findAll();
    }

    public Report getReport(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Report saveReport(Report report) {
        return repository.save(report);
    }

    public void deleteReport(Long id) {
        repository.deleteById(id);
    }

}