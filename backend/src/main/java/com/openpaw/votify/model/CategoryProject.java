package com.openpaw.votify.model;

import java.util.UUID;

public class CategoryProject {
    public record Params(UUID projectId, UUID categoryId) {}

    private UUID id;
    private UUID projectId;
    private UUID categoryId;

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public UUID getProjectId() {
        return projectId;
    }
    public void setProjectId(UUID projectId) {
        this.projectId = projectId;
    }
    public UUID getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(UUID categoryId) {
        this.categoryId = categoryId;
    }
}
