// package com.securescan.backend.repository;

// import com.securescan.backend.entity.Scan;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.List;

// @Repository
// public interface ScanRepository extends JpaRepository<Scan, Long> {

//     List<Scan> findAllByOrderByScanDateDesc();

//     List<Scan> findByScanType(String scanType);

//     List<Scan> findByStatus(String status);

//     List<Scan> findByUserId(Long userId);

// }
package com.securescan.backend.repository;

import com.securescan.backend.entity.Scan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScanRepository extends JpaRepository<Scan, Long> {

    List<Scan> findByUserId(Long userId);

    List<Scan> findByProjectName(String projectName);

    List<Scan> findByStatus(String status);

    List<Scan> findByScanType(String scanType);

}