package com.openpaw.votify.model;

import java.util.UUID;

public class CriterionValue {
    public record Params(UUID criterionId, UUID voteId, float numericValue) {}
    
    private UUID id;
    private UUID criterionId;
    private UUID voteId;
    private float numericValue;

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
}
