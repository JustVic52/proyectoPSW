package com.openpaw.votify.model;

import java.util.List;
import java.util.UUID;

public class Scale {
    public record Params(UUID voteId, String description) {}

    private UUID id;
    private UUID voteId;
    private String description;
    private java.time.LocalDateTime createdAt;
    
    private Voting voting;
    private List<Criterion> criterions = new java.util.ArrayList<>();

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public UUID getVoteId() {
        return voteId;
    }
    public void setVoteId(UUID voteId) {
        this.voteId = voteId;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public java.time.LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(java.time.LocalDateTime createdAt) {
        this.createdAt = createdAt;
    } 
    public Voting getVoting() {
        return voting;
    }
    public void setVoting(Voting voting) {
        this.voting = voting;
    }
    public List<Criterion> getCriterions() {
        return criterions;
    }
    public void setCriterions(List<Criterion> criterions) {
        this.criterions = criterions;
    }
    public void addCriterion(Criterion criterion) {
        this.criterions.add(criterion);
    }
    public void removeCriterion(Criterion criterion) {
        this.criterions.remove(criterion);
    }
}
