package com.openpaw.votify.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class Scale {
    public record Params(UUID votingSessionId, String description) {}

    private UUID id;
    private UUID votingSessionId;
    private String description;
    private LocalDateTime createdAt;

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public UUID getVotingSessionId() {
        return votingSessionId;
    }
    public void setVotingSessionId(UUID votingSessionId) {
        this.votingSessionId = votingSessionId;
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
