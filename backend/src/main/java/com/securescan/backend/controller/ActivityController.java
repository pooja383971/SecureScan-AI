package com.securescan.backend.controller;


import org.springframework.web.bind.annotation.*;
import java.util.*;


@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins="http://localhost:5173")
public class ActivityController {


    @GetMapping
    public List<Map<String,String>> getActivities(){


        List<Map<String,String>> list =
                new ArrayList<>();


        Map<String,String> activity =
                new HashMap<>();


        activity.put(
                "title",
                "Security Scan Completed"
        );


        activity.put(
                "time",
                "Today"
        );


        list.add(activity);


        return list;

    }

}