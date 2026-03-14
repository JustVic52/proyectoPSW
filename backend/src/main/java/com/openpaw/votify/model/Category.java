package com.openpaw.votify.model;

import java.util.UUID;

public class Category {
    public record Params(String name) {}

    private UUID id;
    private String name;
    private java.time.LocalDateTime createdAt;
    
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public java.time.LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(java.time.LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
