package com.bartosz.kowalski.wtto.wtto_project.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Document {

    public Document(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String firstName;
    private String lastName;

    @OneToMany(cascade = CascadeType.ALL)
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

    public void update(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
