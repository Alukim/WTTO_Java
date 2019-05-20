package com.bartosz.kowalski.wtto.wtto_project;

import com.bartosz.kowalski.wtto.wtto_project.exceptions.EntityNotFound;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({EntityNotFound.class})
    public ResponseEntity<Object> handleEntityNotFound(EntityNotFound ex, WebRequest request) {
        return new ResponseEntity<Object>(
                new Object() {
                    public final String message = ex.getMessage();
                    public final long id =  ex.getId();
                },
                new HttpHeaders(), HttpStatus.NOT_FOUND
        );
    }
}
