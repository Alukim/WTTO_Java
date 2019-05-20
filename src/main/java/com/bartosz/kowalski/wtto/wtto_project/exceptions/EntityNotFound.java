package com.bartosz.kowalski.wtto.wtto_project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class EntityNotFound extends DomainException {
    private Long id;

    public EntityNotFound(Long id){
        super(String.format("Entity with id: %s does not exist", id));
        this.id = id;
    }

    public EntityNotFound(String entityName, Long id){
        super(String.format("Entity %s with id: %s does not exist", entityName, id));
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }
}
