package com.bartosz.kowalski.wtto.wtto_project.repositories;

import com.bartosz.kowalski.wtto.wtto_project.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
