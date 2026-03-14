package com.openpaw.votify.factory;

import com.openpaw.votify.model.AnonymousVoteResult;
import com.openpaw.votify.model.Vote;
import com.openpaw.votify.model.VoteResult;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Component
public class VoteFactory {

    public Object create(String type, Map<String, Object> values) {
        UUID id = (UUID) values.get("id");
        UUID voterId = (UUID) values.get("voterId");
        UUID projectId = (UUID) values.get("projectId");
        UUID votingSessionId = (UUID) values.get("votingSessionId");
        String comment = (String) values.get("comment");
        LocalDateTime createdAt = (LocalDateTime) values.get("createdAt");

        return switch (type) {
            case "full" -> new VoteResult(id, voterId, projectId, votingSessionId, comment, createdAt);
            default -> new AnonymousVoteResult(id, projectId, votingSessionId, comment, createdAt);
        };
    }
}
