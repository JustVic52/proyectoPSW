package com.openpaw.votify.model;

import java.util.UUID;

public class CriterionValue {
    public record Params(UUID criterionId, UUID voteId, float numericValue) {}
    
    private UUID id;
    private UUID criterionId;
    private UUID voteId;
    private float numericValue;

    private Criterion criterion;
    private Vote vote;

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public UUID getCriterionId() {
        return criterionId;
    }
    public void setCriterionId(UUID criterionId) {
        this.criterionId = criterionId;
    }
    public UUID getVoteId() {
        return voteId;
    }
    public void setVoteId(UUID voteId) {
        this.voteId = voteId;
    }
    public float getNumericValue() {
        return numericValue;
    }
    public void setNumericValue(float numericValue) {
        this.numericValue = numericValue;
    }
    public Criterion getCriterion() {
        return criterion;
    }
    public void setCriterion(Criterion criterion) {
        this.criterion = criterion;
    }
    public Vote getVote() {
        return vote;
    }
    public void setVote(Vote vote) {
        this.vote = vote;
    }
}
