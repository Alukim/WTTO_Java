package com.bartosz.kowalski.wtto.wtto_project.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "Document")
@Table(name = "document")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String firstName;
    private String lastName;

    @OneToMany(
            mappedBy = "document",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Address> addresses = new HashSet<>();

    public long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Set<Address> getAddresses() {
        return this.addresses;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void addAddress(Address address) {
        this.addresses.add(address);
        address.setDocument(this);
    }

    public void removeAddress(Address address) {
        this.addresses.remove(address);
        address.setDocument(null);
    }
}
