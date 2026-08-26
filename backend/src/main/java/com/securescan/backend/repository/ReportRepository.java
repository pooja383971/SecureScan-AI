// // package com.securescan.backend.repository;

// // import com.securescan.backend.entity.Report;
// // import org.springframework.data.jpa.repository.JpaRepository;

// // public interface ReportRepository extends JpaRepository<Report, Long> {

// // }
// // package com.securescan.backend.repository;

// // import com.securescan.backend.entity.Report;
// // import org.springframework.data.jpa.repository.JpaRepository;
// // import org.springframework.stereotype.Repository;

// // @Repository
// // public interface ReportRepository extends JpaRepository<Report, Long> {

// // }
// package com.securescan.backend.repository;

// import com.securescan.backend.entity.Scan;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface ScanRepository extends JpaRepository<Scan, Long> {

// }
package com.securescan.backend.repository;

import com.securescan.backend.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

}