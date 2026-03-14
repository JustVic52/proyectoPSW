package com.openpaw.votify.model;

import java.util.UUID;

public class CategoryScore {
    public record Params(UUID projectId, UUID categoryId, float score) {}

    private UUID id;
    private UUID projectId;
    private UUID categoryId;
    private float score;

    private Project project;
    private Category category;

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
    public float getScore() {
        return score;
    }
    public void setScore(float score) {
        this.score = score;
    }
    public Project getProject() {
        return project;
    }
    public void setProject(Project project) {
        this.project = project;
    }
    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }
}
