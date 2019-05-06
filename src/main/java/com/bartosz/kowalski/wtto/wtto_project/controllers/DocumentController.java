package com.bartosz.kowalski.wtto.wtto_project.controllers;

import com.bartosz.kowalski.wtto.wtto_project.repositories.DocumentRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentRepository documentRepository;

    public DocumentController(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @GetMapping
    public Iterable findAll() {
        return documentRepository.findAll();
    }
}
