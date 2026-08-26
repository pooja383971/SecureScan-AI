// package com.securescan.backend.dto;

// public class AuthResponse {

//     private String token;
//     private String message;
//     private boolean success;

//     public AuthResponse() {
//     }

//     public AuthResponse(String token, String message, boolean success) {
//         this.token = token;
//         this.message = message;
//         this.success = success;
//     }

//     public String getToken() {
//         return token;
//     }

//     public void setToken(String token) {
//         this.token = token;
//     }

//     public String getMessage() {
//         return message;
//     }

//     public void setMessage(String message) {
//         this.message = message;
//     }

//     public boolean isSuccess() {
//         return success;
//     }

//     public void setSuccess(boolean success) {
//         this.success = success;
//     }
// }
package com.securescan.backend.dto;

public class AuthResponse {

    private String token;

    private String message;

    private boolean success;

    private UserResponse user;

    public AuthResponse() {
    }

    public AuthResponse(String token, String message, boolean success) {
        this.token = token;
        this.message = message;
        this.success = success;
    }

    public AuthResponse(String token,
                        String message,
                        boolean success,
                        UserResponse user) {

        this.token = token;
        this.message = message;
        this.success = success;
        this.user = user;

    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }

}