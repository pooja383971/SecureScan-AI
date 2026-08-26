package com.securescan.backend.security;

import org.springframework.stereotype.Service;

@Service
public class JwtService {

    public String generateToken(String email) {

        // TODO: Generate JWT Token

        return "JWT_TOKEN_FOR_" + email;
    }

    public boolean validateToken(String token) {

        // TODO: Validate JWT Token

        return token != null && !token.isEmpty();
    }

    public String extractUsername(String token) {

        // TODO: Extract username from JWT

        return "user@example.com";
    }
}