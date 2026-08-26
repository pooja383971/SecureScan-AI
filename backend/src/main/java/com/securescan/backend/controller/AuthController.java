// package com.securescan.backend.controller;

// import com.securescan.backend.service.AuthService;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     private final AuthService authService;

//     public AuthController(AuthService authService) {
//         this.authService = authService;
//     }

//     @PostMapping("/register")
//     public String register() {
//         return authService.registerUser();
//     }

//     @PostMapping("/login")
//     public String login() {
//         return authService.loginUser();
//     }
// }

// package com.securescan.backend.controller;

// import com.securescan.backend.service.AuthService;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     private final AuthService authService;

//     public AuthController(AuthService authService) {
//         this.authService = authService;
//     }

//     @PostMapping("/register")
//     public String register() {
//         return authService.registerUser();
//     }

//     @PostMapping("/login")
//     public String login() {
//         return authService.loginUser();
//     }
// }
// package com.securescan.backend.controller;

// import com.securescan.backend.dto.AuthResponse;
// import com.securescan.backend.dto.LoginRequest;
// import com.securescan.backend.dto.RegisterRequest;
// import com.securescan.backend.service.AuthService;
// import jakarta.validation.Valid;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin(origins = "http://localhost:5173")
// public class AuthController {

//     private final AuthService authService;

//     public AuthController(AuthService authService) {
//         this.authService = authService;
//     }

//     @PostMapping("/register")
//     public AuthResponse register(
//             @Valid @RequestBody RegisterRequest request) {

//         return authService.registerUser(request);

//     }

//     @PostMapping("/login")
//     public AuthResponse login(
//             @Valid @RequestBody LoginRequest request) {

//         return authService.loginUser(request);

//     }

// }
// package com.securescan.backend.controller;

// import com.securescan.backend.dto.AuthResponse;
// import com.securescan.backend.dto.LoginRequest;
// import com.securescan.backend.dto.RegisterRequest;
// import com.securescan.backend.service.AuthService;
// import jakarta.validation.Valid;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin(origins = "http://localhost:5173")
// public class AuthController {

//     private final AuthService authService;

//     public AuthController(AuthService authService) {
//         this.authService = authService;
//     }

//     @PostMapping("/register")
//     public AuthResponse register(
//             @Valid @RequestBody RegisterRequest request) {

//         return authService.registerUser(request);

//     }

//     @PostMapping("/login")
//     public AuthResponse login(
//             @Valid @RequestBody LoginRequest request) {

//         return authService.loginUser(request);

//     }

// }
package com.securescan.backend.controller;

import com.securescan.backend.dto.AuthResponse;
import com.securescan.backend.dto.LoginRequest;
import com.securescan.backend.dto.RegisterRequest;
import com.securescan.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
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