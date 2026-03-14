package com.openpaw.votify.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


public class Project {
    public record Params(String title, String description) {}

    private UUID id;
    private String title;
    private String description;
    private LocalDateTime createdAt;

    private List<Vote> votes = new ArrayList<>();
    private List<CategoryScore> categoryScores = new ArrayList<>();

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

    public List<Vote> getVotes() {
        return votes;
    }

    public void setVotes(List<Vote> votes) {
        this.votes = votes;
    }

    public void addVote(Vote vote) {
        this.votes.add(vote);
    }

    public void removeVote(Vote vote) {
        this.votes.remove(vote);
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
