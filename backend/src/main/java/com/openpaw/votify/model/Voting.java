package com.openpaw.votify.model;

import java.util.UUID;

import com.openpaw.votify.utils.VotingType;

public class Voting {
    public record Params(UUID categoryId, VotingType votingType, boolean canVoteOwnProject, java.time.LocalDateTime starTime, java.time.LocalDateTime endTime) {}

    private UUID id;
    private UUID categoryId;
    private VotingType votingType;
    private boolean canVoteOwnProject;
    private java.time.LocalDateTime createdAt;
    private java.time.LocalDateTime starTime;
    private java.time.LocalDateTime endTime;
    
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public UUID getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(UUID categoryId) {
        this.categoryId = categoryId;
    }
    public VotingType getVotingType() {
        return votingType;
    }
    public void setVotingType(VotingType votingType) {
        this.votingType = votingType;
    }
    public boolean isCanVoteOwnProject() {
        return canVoteOwnProject;
    }
    public void setCanVoteOwnProject(boolean canVoteOwnProject) {
        this.canVoteOwnProject = canVoteOwnProject;
    }
    public java.time.LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(java.time.LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public java.time.LocalDateTime getStarTime() {
        return starTime;
    }
    public void setStarTime(java.time.LocalDateTime starTime) {
        this.starTime = starTime;
    }
    public java.time.LocalDateTime getEndTime() {
        return endTime;
    }
    public void setEndTime(java.time.LocalDateTime endTime) {
        this.endTime = endTime;
    }

    
}
