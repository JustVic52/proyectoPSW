package com.openpaw.votify.model;

import java.util.List;
import java.util.UUID;

public class Category {
    public record Params(String name) {}

    private UUID id;
    private String name;
    private java.time.LocalDateTime createdAt;
    
    private List<Voting> votings;
    private List<CategoryScore> categoryScores;

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
    public List<Voting> getVotings() {
        return votings;
    }
    public void setVotings(List<Voting> votings) {
        this.votings = votings;
    }
    public void addVoting(Voting voting) {
        this.votings.add(voting);
    }
    public void removeVoting(Voting voting) {
        this.votings.remove(voting);
    }
    public List<CategoryScore> getCategoryScores() {
        return categoryScores;
    }
    public void setCategoryScores(List<CategoryScore> categoryScores) {
        this.categoryScores = categoryScores;
    }
    public void addCategoryScore(CategoryScore categoryScore) {
        this.categoryScores.add(categoryScore);
    }
    public void removeCategoryScore(CategoryScore categoryScore) {
        this.categoryScores.remove(categoryScore);
    }
}
