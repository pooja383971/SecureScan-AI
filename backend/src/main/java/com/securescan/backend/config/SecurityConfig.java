// package com.securescan.backend.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import org.springframework.security.config.Customizer;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;

// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http)
//             throws Exception {

//         http

//                 .csrf(csrf -> csrf.disable())

//                 .authorizeHttpRequests(auth -> auth

//                         .requestMatchers("/**").permitAll()

//                         .anyRequest().authenticated()

//                 )

//                 .httpBasic(Customizer.withDefaults());

//         return http.build();

//     }

// }
package com.securescan.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                // Disable CSRF for REST APIs
                .csrf(csrf -> csrf.disable())

                // Disable default login page
                .formLogin(form -> form.disable())

                // Disable HTTP Basic Authentication
                .httpBasic(httpBasic -> httpBasic.disable())

                // Allow all requests
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/website/**",
                                "/api/apk/**",
                                "/api/dashboard/**",
                                "/api/reports/**",
                                "/api/history/**",
                                "/api/profile/**",
                                "/api/settings/**"
                        ).permitAll()
                        .anyRequest().permitAll()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}