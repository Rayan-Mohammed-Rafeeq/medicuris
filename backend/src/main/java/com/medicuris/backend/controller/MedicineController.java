package com.medicuris.backend.controller;

import com.medicuris.backend.dto.CreateMedicineRequest;
import com.medicuris.backend.dto.MedicineDto;
import com.medicuris.backend.dto.UpdateMedicineRequest;
import com.medicuris.backend.service.MedicineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    @PostMapping
    public ResponseEntity<MedicineDto> create(@RequestBody CreateMedicineRequest req) {
        MedicineDto dto = medicineService.create(req);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicineDto> update(@PathVariable Long id, @RequestBody UpdateMedicineRequest req) {
        MedicineDto dto = medicineService.update(id, req);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(medicineService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<MedicineDto>> listAll() {
        return ResponseEntity.ok(medicineService.listAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        medicineService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
