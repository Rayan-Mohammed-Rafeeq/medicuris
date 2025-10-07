package com.medicuris.backend.repository;

import com.medicuris.backend.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    // you can add custom queries if needed
}
