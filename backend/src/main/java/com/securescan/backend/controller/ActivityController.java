package com.securescan.backend.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "https://secure-scan-ai-psi.vercel.app")
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