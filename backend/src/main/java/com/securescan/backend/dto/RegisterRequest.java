// package com.securescan.backend.dto;

// import lombok.Data;

// @Data
// public class RegisterRequest {

//     private String fullName;
//     private String email;
//     private String password;

// }
// package com.securescan.backend.dto;

// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Size;
// import lombok.Data;

// @Data
// public class RegisterRequest {

//     @NotBlank(message = "Full Name is required")
//     private String fullName;

//     @Email(message = "Please enter a valid email")
//     @NotBlank(message = "Email is required")
//     private String email;

//     @NotBlank(message = "Password is required")
//     @Size(min = 6, message = "Password must be at least 6 characters")
//     private String password;

// }
package com.securescan.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Full Name is required")
    @Size(min = 3, max = 100, message = "Full Name must be between 3 and 100 characters")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be at least 6 characters")
    private String password;

    public String getFullName() {
        return fullName == null ? null : fullName.trim();
    }

    public String getEmail() {
        return email == null ? null : email.trim().toLowerCase();
    }

    public String getPassword() {
        return password;
    }
}