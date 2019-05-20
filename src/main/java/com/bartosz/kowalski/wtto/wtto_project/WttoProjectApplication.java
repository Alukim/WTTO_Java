package com.bartosz.kowalski.wtto.wtto_project;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("com.bartosz.kowalski.wtto.wtto_project.repositories")
@EntityScan("com.bartosz.kowalski.wtto.wtto_project.models")
@SpringBootApplication
public class WttoProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(WttoProjectApplication.class, args);
    }

}

