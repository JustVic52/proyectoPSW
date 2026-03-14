package com.openpaw.votify.model;

import java.util.List;
import java.util.UUID;

public class VoteResponse {
    public record Params(UUID projectId, UUID votingSessionId, String comment, List<CriterionValueInput> criterionValues) {}
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
