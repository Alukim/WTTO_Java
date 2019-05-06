package com.bartosz.kowalski.wtto.wtto_project.repositories;

import com.bartosz.kowalski.wtto.wtto_project.models.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
