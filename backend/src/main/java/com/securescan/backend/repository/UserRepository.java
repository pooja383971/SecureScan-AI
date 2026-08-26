// package com.securescan.backend.repository;

// import com.securescan.backend.entity.User;
// import org.springframework.data.jpa.repository.JpaRepository;

// import java.util.Optional;

// public interface UserRepository extends JpaRepository<User, Long> {

//     Optional<User> findByEmail(String email);

// }
// package com.securescan.backend.repository;

// import com.securescan.backend.entity.User;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.Optional;

// @Repository
// public interface UserRepository extends JpaRepository<User, Long> {

//     Optional<User> findByEmail(String email);

// }
// package com.securescan.backend.repository;

// import com.securescan.backend.entity.User;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.Optional;

// @Repository
// public interface UserRepository extends JpaRepository<User, Long> {

//     // Find user by email (used for login)
//     Optional<User> findByEmail(String email);

//     // Check if email already exists (used for registration)
//     boolean existsByEmail(String email);

// }
package com.securescan.backend.repository;

import com.securescan.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email
    Optional<User> findByEmail(String email);

    // Check whether email already exists
    boolean existsByEmail(String email);

    // Find user by ID
    Optional<User> findById(Long id);

}