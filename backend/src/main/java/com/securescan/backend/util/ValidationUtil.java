package com.securescan.backend.util;

public class ValidationUtil {

    public static boolean isValidEmail(String email) {

        return email != null &&
                email.matches("^[A-Za-z0-9+_.-]+@(.+)$");

    }

    public static boolean isEmpty(String value) {

        return value == null || value.trim().isEmpty();

    }
}