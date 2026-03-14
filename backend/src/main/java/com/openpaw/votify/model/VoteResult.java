package com.openpaw.votify.model;

import java.time.LocalDateTime;
import java.util.UUID;

public record VoteResult(
        UUID id,
        UUID voterId,
        UUID projectId,
        UUID votingSessionId,
        String comment,
        LocalDateTime createdAt
) {}
