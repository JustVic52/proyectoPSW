package com.openpaw.votify.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Vote {
    public record Params(UUID voterId, UUID projectId, String comment) {}

    private UUID id;
    private UUID voterId;
    private UUID projectId;
    private String comment;
    private java.time.LocalDateTime createdAt;
    
    private Project project;
    private List<CriterionValue> criterionValues = new ArrayList<>();

    public Project getProject() {
        return project;
    }
    public void setProject(Project project) {
        this.project = project;
    }
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public UUID getVoterId() {
        return voterId;
    }
    public void setVoterId(UUID voterId) {
        this.voterId = voterId;
    }
    public UUID getProjectId() {
        return projectId;
    }
    public void setProjectId(UUID projectId) {
        this.projectId = projectId;
    }
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
    public java.time.LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(java.time.LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public List<CriterionValue> getCriterionValues() {
        return criterionValues;
    }
    public void setCriterionValues(List<CriterionValue> criterionValues) {
        this.criterionValues = criterionValues;
    }
    public void addCriterionValue(CriterionValue criterionValue) {
        this.criterionValues.add(criterionValue);
    }
    public void removeCriterionValue(CriterionValue criterionValue) {
        this.criterionValues.remove(criterionValue);
    }
}
