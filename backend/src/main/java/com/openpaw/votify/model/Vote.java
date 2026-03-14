package com.openpaw.votify.model;

import java.util.UUID;

public class Vote extends AnonymousVote {
    public static final UUID PLACEHOLDER_VOTER_ID = UUID.fromString("00000000-0000-0000-0000-000000000001");

    private UUID voterId;

    public UUID getVoterId() { return voterId; }
    public void setVoterId(UUID voterId) { this.voterId = voterId; }
}
