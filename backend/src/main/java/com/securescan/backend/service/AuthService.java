// package com.securescan.backend.service;

// import com.securescan.backend.dto.AuthResponse;
// import com.securescan.backend.dto.LoginRequest;
// import com.securescan.backend.dto.RegisterRequest;
// import com.securescan.backend.entity.Role;
// import com.securescan.backend.entity.User;
// import com.securescan.backend.repository.UserRepository;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// @Service
// public class AuthService {

//     private final UserRepository userRepository;
//     private final PasswordEncoder passwordEncoder;

//     public AuthService(UserRepository userRepository,
//                        PasswordEncoder passwordEncoder) {
//         this.userRepository = userRepository;
//         this.passwordEncoder = passwordEncoder;
//     }

//     // =========================
//     // Register User
//     // =========================
//     public AuthResponse registerUser(RegisterRequest request) {

//         if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
//             return new AuthResponse(
//                     null,
//                     "Email already exists",
//                     false
//             );
//         }

//         User user = new User();

//         user.setFullName(request.getFullName());
//         user.setEmail(request.getEmail().trim().toLowerCase());
//         user.setPassword(passwordEncoder.encode(request.getPassword()));
//         user.setRole(Role.USER);

//         userRepository.save(user);

//         return new AuthResponse(
//                 "REGISTER_SUCCESS",
//                 "User Registered Successfully",
//                 true
//         );
//     }

//     // =========================
//     // Login User
//     // =========================
//     public AuthResponse loginUser(LoginRequest request) {

//         User user = userRepository
//                 .findByEmail(request.getEmail().trim().toLowerCase())
//                 .orElse(null);

//         if (user == null) {
//             return new AuthResponse(
//                     null,
//                     "Invalid Email",
//                     false
//             );
//         }

//         if (!passwordEncoder.matches(
//                 request.getPassword(),
//                 user.getPassword())) {

//             return new AuthResponse(
//                     null,
//                     "Invalid Password",
//                     false
//             );
//         }

//         return new AuthResponse(
//                 "LOGIN_SUCCESS",
//                 "Login Successful",
//                 true
//         );
//     }
// }
// package com.securescan.backend.service;

// import com.securescan.backend.dto.AuthResponse;
// import com.securescan.backend.dto.LoginRequest;
// import com.securescan.backend.dto.RegisterRequest;
// import com.securescan.backend.dto.UserResponse;
// import com.securescan.backend.entity.Role;
// import com.securescan.backend.entity.User;
// import com.securescan.backend.repository.UserRepository;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// @Service
// public class AuthService {

//     private final UserRepository userRepository;
//     private final PasswordEncoder passwordEncoder;

//     public AuthService(UserRepository userRepository,
//                        PasswordEncoder passwordEncoder) {

//         this.userRepository = userRepository;
//         this.passwordEncoder = passwordEncoder;
//     }

//     // ====================================
//     // REGISTER USER
//     // ====================================
//     public AuthResponse registerUser(RegisterRequest request) {

//         String email = request.getEmail().trim().toLowerCase();

//         if (userRepository.existsByEmail(email)) {

//             return new AuthResponse(
//                     null,
//                     "Email already exists",
//                     false,
//                     null
//             );

//         }

//         User user = new User();

//         user.setFullName(request.getFullName());
//         user.setEmail(email);
//         user.setPassword(passwordEncoder.encode(request.getPassword()));
//         user.setRole(Role.USER);

//         userRepository.save(user);

//         UserResponse userResponse = new UserResponse(
//                 user.getFullName(),
//                 user.getEmail()
//         );

//         return new AuthResponse(
//                 "REGISTER_SUCCESS",
//                 "User Registered Successfully",
//                 true,
//                 userResponse
//         );

//     }

//     // ====================================
//     // LOGIN USER
//     // ====================================
//     public AuthResponse loginUser(LoginRequest request) {

//         String email = request.getEmail().trim().toLowerCase();

//         User user = userRepository
//                 .findByEmail(email)
//                 .orElse(null);

//         if (user == null) {

//             return new AuthResponse(
//                     null,
//                     "Invalid Email",
//                     false,
//                     null
//             );

//         }

//         if (!passwordEncoder.matches(
//                 request.getPassword(),
//                 user.getPassword())) {

//             return new AuthResponse(
//                     null,
//                     "Invalid Password",
//                     false,
//                     null
//             );

//         }

//         UserResponse userResponse = new UserResponse(
//                 user.getFullName(),
//                 user.getEmail()
//         );

//         return new AuthResponse(
//                 "LOGIN_SUCCESS",
//                 "Login Successful",
//                 true,
//                 userResponse
//         );

//     }

// }
package com.securescan.backend.service;

import com.securescan.backend.dto.AuthResponse;
import com.securescan.backend.dto.LoginRequest;
import com.securescan.backend.dto.RegisterRequest;
import com.securescan.backend.dto.UserResponse;

import com.securescan.backend.entity.Role;
import com.securescan.backend.entity.User;

import com.securescan.backend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

        private final UserRepository userRepository;

        private final PasswordEncoder passwordEncoder;

        public AuthService(
                        UserRepository userRepository,
                        PasswordEncoder passwordEncoder) {

                this.userRepository = userRepository;
                this.passwordEncoder = passwordEncoder;

        }

        // ===============================
        // REGISTER
        // ===============================

        public AuthResponse registerUser(RegisterRequest request) {

                String email = request.getEmail()
                                .trim()
                                .toLowerCase();

                if (userRepository.existsByEmail(email)) {

                        return new AuthResponse(
                                        null,
                                        "Email already exists",
                                        false,
                                        null);

                }

                User user = new User();

                user.setFullName(request.getFullName());

                user.setEmail(email);

                // BCrypt password save
                user.setPassword(
                                passwordEncoder.encode(request.getPassword()));

                user.setRole(Role.USER);

                userRepository.save(user);

                UserResponse response = new UserResponse(
                                user.getFullName(),
                                user.getEmail());

                return new AuthResponse(

                                "REGISTER_SUCCESS",

                                "Registration Successful",

                                true,

                                response

                );

        }

        // ===============================
        // LOGIN
        // ===============================

        public AuthResponse loginUser(LoginRequest request) {

                String email = request.getEmail()
                                .trim()
                                .toLowerCase();

                User user = userRepository
                                .findByEmail(email)
                                .orElse(null);

                if (user == null) {

                        return new AuthResponse(

                                        null,

                                        "User not found",

                                        false,

                                        null

                        );

                }

                boolean passwordMatch = passwordEncoder.matches(

                                request.getPassword(),

                                user.getPassword()

                );

                if (!passwordMatch) {

                        return new AuthResponse(

                                        null,

                                        "Wrong password",

                                        false,

                                        null

                        );

                }

                UserResponse userResponse = new UserResponse(

                                user.getFullName(),

                                user.getEmail()

                );

                return new AuthResponse(

                                "LOGIN_SUCCESS",

                                "Login Successful",

                                true,

                                userResponse

                );

        }

}