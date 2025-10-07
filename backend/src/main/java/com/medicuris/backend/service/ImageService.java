package com.medicuris.backend.service;

import com.medicuris.backend.dto.ImageUploadResponse;
import com.medicuris.backend.entity.ImageEntity;
import com.medicuris.backend.repository.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.core.sync.RequestBody;

import java.io.IOException;
import java.util.UUID;

@Service
public class ImageService {

    private final S3Client s3;
    private final ImageRepository imageRepository;
    private final String bucketName;

    public ImageService(S3Client r2S3Client, ImageRepository imageRepository,
                        org.springframework.beans.factory.annotation.Value("${cloud.r2.bucket-name}") String bucketName) {
        this.s3 = r2S3Client;
        this.imageRepository = imageRepository;
        this.bucketName = bucketName;
    }

    public ImageUploadResponse uploadImage(MultipartFile file) throws IOException {
        String key = "uploads/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

        PutObjectRequest req = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(file.getContentType())
                .acl("public-read")
                .build();

        s3.putObject(req, RequestBody.fromBytes(file.getBytes()));

        // Construct URL (adjust to your R2 endpoint style)
        String url = String.format("%s/%s/%s",
                "https://<ACCOUNT_ID>.r2.cloudflarestorage.com", bucketName, key);

        ImageEntity imageEntity = new ImageEntity();
        imageEntity.setFilename(file.getOriginalFilename());
        imageEntity.setUrl(url);
        imageEntity = imageRepository.save(imageEntity);

        return new ImageUploadResponse(imageEntity.getId(), url);
    }
}
