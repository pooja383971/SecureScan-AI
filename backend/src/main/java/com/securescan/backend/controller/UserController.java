package com.securescan.backend.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;



@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {



    // ============================
    // GET USER PROFILE
    // ============================

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {


        Map<String, Object> profile = new HashMap<>();


        profile.put("name", "User");
        profile.put("email", "user@gmail.com");
        profile.put("phone", "+91 9876543210");
        profile.put("company", "");
        profile.put("designation", "Security Analyst");
        profile.put("address", "");
        profile.put("city", "");
        profile.put("country", "India");
        profile.put("about", "");


        return ResponseEntity.ok(profile);

    }



    // ============================
    // GET USER ACTIVITIES
    // ============================

    @GetMapping("/activities")
    public ResponseEntity<?> getActivities() {


        Map<String, Object> activity = new HashMap<>();

        activity.put("totalScans", 10);
        activity.put("lastScan", "Today");
        activity.put("status", "Active");


        return ResponseEntity.ok(activity);

    }



    // ============================
    // GET USER SETTINGS
    // ============================

    @GetMapping("/settings")
    public ResponseEntity<?> getSettings() {


        Map<String, Object> settings = new HashMap<>();


        settings.put("emailNotification", true);
        settings.put("securityAlert", true);
        settings.put("theme", "light");
        settings.put("language", "English");


        return ResponseEntity.ok(settings);

    }



    // ============================
    // UPDATE USER SETTINGS
    // ============================

    @PutMapping("/settings")
    public ResponseEntity<?> updateSettings(
            @RequestBody Map<String,Object> settings
    ) {


        return ResponseEntity.ok(settings);

    }


}