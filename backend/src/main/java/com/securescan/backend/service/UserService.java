package com.securescan.backend.service;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    public String getProfile() {
        return "User Profile";
    }

    public String updateProfile() {
        return "Profile Updated Successfully";
    }

}