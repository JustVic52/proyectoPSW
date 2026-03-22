package com.openpaw.votify.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

public class AnonymousVote {
    public record Params(UUID projectId, UUID votingSessionId, String comment, @Min(1) @Max(10) Integer score) {}

    public AnonymousVote() {}

    public AnonymousVote(AnonymousVote source) {
        this.id = source.id;
        this.projectId = source.projectId;
        this.votingSessionId = source.votingSessionId;
        this.comment = source.comment;
        this.createdAt = source.createdAt;
        this.score = source.score;
    }

    private UUID id;
    private UUID projectId;
    private UUID votingSessionId;
    private String comment;
    private LocalDateTime createdAt;
    private Integer score;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getProjectId() { return projectId; }
    public void setProjectId(UUID projectId) { this.projectId = projectId; }
    public UUID getVotingSessionId() { return votingSessionId; }
    public void setVotingSessionId(UUID votingSessionId) { this.votingSessionId = votingSessionId; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
}
