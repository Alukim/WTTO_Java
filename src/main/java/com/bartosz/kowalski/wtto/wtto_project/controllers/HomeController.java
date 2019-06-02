package com.bartosz.kowalski.wtto.wtto_project.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String swaggerPage(Model model) {
        return "redirect:/swagger-ui.html";
    }
}
