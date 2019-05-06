package com.bartosz.kowalski.wtto.wtto_project.models;

import javax.persistence.*;

@Entity
public class Address {

    public Address(String addressLine, String city, String postCode) {
        this.addressLine = addressLine;
        this.city = city;
        this.postCode = postCode;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private final String addressLine;
    private final String city;
    private final String postCode;

    @ManyToOne
    @JoinColumn(name = "document_id")
    private Document document;

    public long getId() {
        return id;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public String getCity() {
        return city;
    }

    public String getPostCode() {
        return postCode;
    }
}
