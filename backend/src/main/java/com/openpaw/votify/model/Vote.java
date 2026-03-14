package com.openpaw.votify.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class Vote {
    public static final UUID PLACEHOLDER_VOTER_ID = UUID.fromString("00000000-0000-0000-0000-000000000001");

    public record Params(UUID projectId, UUID votingSessionId, String comment) {
        public UUID voterId() {
            return PLACEHOLDER_VOTER_ID;
        }
    }

    private UUID id;
    private UUID voterId;
    private UUID projectId;
    private UUID votingSessionId;
    private String comment;
    private LocalDateTime createdAt;

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
    public UUID getVotingSessionId() {
        return votingSessionId;
    }
    public void setVotingSessionId(UUID votingSessionId) {
        this.votingSessionId = votingSessionId;
    }
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}
