package com.bartosz.kowalski.wtto.wtto_project.controllers;

import com.bartosz.kowalski.wtto.wtto_project.repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @Value("${spring.application.name}")
    String appName;

    private final DocumentRepository documentRepository;

    public HomeController(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @GetMapping("/")
    public String homePage(Model model) {
        model.addAttribute("appName", appName);
        model.addAttribute("username", "Bartosz Kowalski");
        model.addAttribute("documents", documentRepository.findAll());
        return "home";
    }

    @GetMapping("/new")
    public String newPage(Model model) {
        model.addAttribute("username", "Bartosz Kowalski");
        return "new";
    }
}
