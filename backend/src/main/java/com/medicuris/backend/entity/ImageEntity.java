package com.medicuris.backend.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "images")
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String filename;

    private String url;

    private Instant uploadedAt = Instant.now();

    // getters / setters
}

