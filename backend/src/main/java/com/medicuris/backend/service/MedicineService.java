package com.medicuris.backend.service;

import com.medicuris.backend.dto.CreateMedicineRequest;
import com.medicuris.backend.dto.MedicineDto;
import com.medicuris.backend.dto.UpdateMedicineRequest;
import com.medicuris.backend.entity.Medicine;
import com.medicuris.backend.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    public MedicineDto create(CreateMedicineRequest req) {
        Medicine med = new Medicine();
        med.setName(req.getName());
        med.setDescription(req.getDescription());
        med.setPrice(req.getPrice());
        med.setQuantity(req.getQuantity());
        med.setImageUrl(req.getImageUrl());
        med = medicineRepository.save(med);
        return toDto(med);
    }

    public MedicineDto update(Long id, UpdateMedicineRequest req) {
        Medicine med = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        med.setName(req.getName());
        med.setDescription(req.getDescription());
        med.setPrice(req.getPrice());
        med.setQuantity(req.getQuantity());
        med.setImageUrl(req.getImageUrl());
        med = medicineRepository.save(med);
        return toDto(med);
    }

    public void delete(Long id) {
        medicineRepository.deleteById(id);
    }

    public MedicineDto getById(Long id) {
        Medicine med = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        return toDto(med);
    }

    public List<MedicineDto> listAll() {
        return medicineRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private MedicineDto toDto(Medicine med) {
        MedicineDto dto = new MedicineDto();
        dto.setId(med.getId());
        dto.setName(med.getName());
        dto.setDescription(med.getDescription());
        dto.setPrice(med.getPrice());
        dto.setQuantity(med.getQuantity());
        dto.setImageUrl(med.getImageUrl());
        return dto;
    }
}
