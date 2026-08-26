
package com.securescan.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.securescan.backend.dto.AuthResponse;
import com.securescan.backend.dto.LoginRequest;
import com.securescan.backend.dto.RegisterRequest;
import com.securescan.backend.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "https://secure-scan-ai-psi.vercel.app")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ==========================
    // REGISTER
    // ==========================
    @PostMapping("/register")
    public AuthResponse register(
            @Valid @RequestBody RegisterRequest request) {

        return authService.registerUser(request);

    }

    // ==========================
    // LOGIN
    // ==========================
    @PostMapping("/login")
    public AuthResponse login(
            @Valid @RequestBody LoginRequest request) {

        return authService.loginUser(request);

    }

}