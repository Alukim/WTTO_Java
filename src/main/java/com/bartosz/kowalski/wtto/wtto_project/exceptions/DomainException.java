package com.bartosz.kowalski.wtto.wtto_project.exceptions;

public class DomainException extends RuntimeException {

    private String message;

    public DomainException(String message){
        super(String.format(message));
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
