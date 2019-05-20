package com.bartosz.kowalski.wtto.wtto_project.controllers;

import com.bartosz.kowalski.wtto.wtto_project.exceptions.EntityNotFound;
import com.bartosz.kowalski.wtto.wtto_project.models.Address;
import com.bartosz.kowalski.wtto.wtto_project.models.Document;
import com.bartosz.kowalski.wtto.wtto_project.repositories.AddressRepository;
import com.bartosz.kowalski.wtto.wtto_project.repositories.DocumentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentRepository documentRepository;
    private final AddressRepository addressRepository;

    public DocumentController(DocumentRepository documentRepository, AddressRepository addressRepository) {
        this.documentRepository = documentRepository;
        this.addressRepository = addressRepository;
    }

    @GetMapping
    public List<Document> findAll() {
        return documentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Document findById(@PathVariable Long id) {
        Optional<Document> document = documentRepository.findById(id);

        if(!document.isPresent())
            throw new EntityNotFound(id);

        return document.get();
    }

    @GetMapping("/{id}/addresses")
    public Set<Address> getDocumentAddresses(@PathVariable long id) {
        Optional<Document> optionalDocument = documentRepository.findById(id);

        if(!optionalDocument.isPresent())
            throw new EntityNotFound(id);

        Document document = optionalDocument.get();
        return document.getAddresses();
    }

    @GetMapping("/{id}/addresses/{addressId}")
    public Address getDocumentAddress(@PathVariable long id, @PathVariable long addressId) {
        Optional<Document> optionalDocument = documentRepository.findById(id);

        if(!optionalDocument.isPresent())
            throw new EntityNotFound(id);

        Optional<Address> optionalAddress = addressRepository.findById(addressId);

        if(!optionalAddress.isPresent())
            throw new EntityNotFound(id);

        return optionalAddress.get();
    }

    @PostMapping
    public ResponseEntity<Object> addDocument(@Valid @RequestBody Document document) {
        documentRepository.save(document);
        return ResponseEntity.created(URI.create("/api/documents/" + document.getId())).body(document.getId());
    }

    @PutMapping("/{id}/addresses")
    public ResponseEntity addAddressToDocument(@PathVariable Long id, @Valid @RequestBody Address address) {
        documentRepository.findById(id).map(doc -> {
            doc.addAddress(address);
            return documentRepository.save(doc);
        }).orElseThrow(() -> new EntityNotFound("Document", id));
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/details")
    public ResponseEntity updateDocumentDetails(@PathVariable long id, @Valid @RequestBody Document document) {
        documentRepository.findById(id).map(doc -> {
            doc.setFirstName(document.getFirstName());
            doc.setLastName(document.getLastName());
            return documentRepository.save(doc);
        }).orElseThrow(() -> new EntityNotFound("Document", id));
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/addresses/{addressId}")
    public ResponseEntity updateDocumentAddress(@PathVariable long id, @PathVariable long addressId, @Valid @RequestBody Address address) {
        Optional<Document> optionalDocument = documentRepository.findById(id);

        if(!optionalDocument.isPresent())
            throw new EntityNotFound(id);

        Optional<Address> optionalAddress = optionalDocument
                .get()
                .getAddresses()
                .stream()
                .filter(c -> c.getId() == addressId)
                .findAny();

        if(!optionalAddress.isPresent())
            throw new EntityNotFound("Address", addressId);

        addressRepository.findById(addressId).map(add -> {
            add.setAddressLine(address.getAddressLine());
            add.setCity(address.getCity());
            add.setPostCode(address.getPostCode());
            return addressRepository.save(add);
        }).orElseThrow(() -> new EntityNotFound("Address", addressId));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/addresses/{addressId}")
    public ResponseEntity removeDocumentAddress(@PathVariable long id, @PathVariable long addressId) {
        documentRepository.findById(id).map(doc -> {
            Optional<Address> optionalAddress = doc.getAddresses().stream().filter(c -> c.getId() == addressId).findAny();

            if(!optionalAddress.isPresent())
                throw new EntityNotFound("Address", addressId);

            doc.removeAddress(optionalAddress.get());
            return documentRepository.save(doc);
        }).orElseThrow(() -> new EntityNotFound("Document", id));
        return ResponseEntity.ok().build();
    }
}
