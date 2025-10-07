package com.medicuris.backend.controller;

import com.medicuris.backend.dto.ImageUploadResponse;
import com.medicuris.backend.service.ImageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ImageUploadResponse> upload(@RequestParam("file") MultipartFile file) throws Exception {
        ImageUploadResponse resp = imageService.uploadImage(file);
        return ResponseEntity.ok(resp);
    }
}
