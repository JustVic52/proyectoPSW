package com.openpaw.votify.model;

import java.time.LocalDateTime;
import java.util.UUID;

public record AnonymousVoteResult(
        UUID id,
        UUID projectId,
        UUID votingSessionId,
        String comment,
        LocalDateTime createdAt
) {}
