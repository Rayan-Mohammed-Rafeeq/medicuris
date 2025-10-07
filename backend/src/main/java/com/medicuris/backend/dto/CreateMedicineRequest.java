package com.medicuris.backend.dto;

import java.math.BigDecimal;

public class CreateMedicineRequest {
    private String name;
    private String description;
    private BigDecimal price;
    private Integer quantity;
    private String imageUrl;  // front-end should supply URL after uploading image

    // getters / setters
}
