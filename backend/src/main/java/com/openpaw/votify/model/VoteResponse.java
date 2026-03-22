package com.openpaw.votify.model;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public class VoteResponse {
    public record Params(UUID projectId, UUID votingSessionId, String comment, @Min(1) @Max(10) Integer score,  List<CriterionValueInput> criterionValues) {}
    public record CriterionValueInput(UUID criterionId, float numericValue) {}

    private Vote vote;
    private List<CriterionValue> criterionValues;

    public VoteResponse(Vote vote, List<CriterionValue> criterionValues) {
        this.vote = vote;
        this.criterionValues = criterionValues;
    }

    public Vote getVote() {
        return vote;
    }
    public List<CriterionValue> getCriterionValues() {
        return criterionValues;
    }
}
