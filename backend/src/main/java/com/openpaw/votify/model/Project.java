package com.openpaw.votify.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class Project {
    public record Params(String title, String description) {}

    private UUID id;
    private String title;
    private String description;
    private LocalDateTime createdAt;

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
