// // package com.securescan.backend;

// // import org.springframework.boot.SpringApplication;
// // import org.springframework.boot.autoconfigure.SpringBootApplication;

// // @SpringBootApplication
// // public class BackendApplication {

// // 	public static void main(String[] args) {
// // 		SpringApplication.run(BackendApplication.class, args);
// // 	}

// // }
// package com.securescan.backend;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// import java.util.TimeZone;

// @SpringBootApplication
// public class BackendApplication {

//     public static void main(String[] args) {

//         TimeZone.setDefault(TimeZone.getTimeZone("Asia/Kolkata"));

//         SpringApplication.run(BackendApplication.class, args);
//     }
// }
package com.securescan.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(BackendApplication.class, args);

    }

}