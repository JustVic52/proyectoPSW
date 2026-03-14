package com.openpaw.votify.model;

import java.time.LocalDateTime;
import java.util.UUID;

import com.openpaw.votify.utils.VotingType;

public class VotingSession {
    public record Params(UUID categoryId, VotingType votingType, boolean canVoteOwnProject, LocalDateTime startTime, LocalDateTime endTime) {
        public Params {
            if (votingType == null) votingType = VotingType.SCORE_BASED;
            if (startTime == null) startTime = LocalDateTime.now();
        }
    }

    private UUID id;
    private UUID categoryId;
    private VotingType votingType;
    private boolean canVoteOwnProject;
    private LocalDateTime createdAt;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

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
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public LocalDateTime getStartTime() {
        return startTime;
    }
    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }
    public LocalDateTime getEndTime() {
        return endTime;
    }
    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }
}
