package com.securescan.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/users")
    public String allUsers() {
        return "All Users";
    }

}