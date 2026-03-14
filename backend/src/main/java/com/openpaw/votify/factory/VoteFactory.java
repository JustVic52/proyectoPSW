package com.openpaw.votify.factory;

import com.openpaw.votify.model.AnonymousVote;
import com.openpaw.votify.model.Vote;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class VoteFactory implements EntityFactory<AnonymousVote> {

    @Override
    public AnonymousVote create(String type, Map<String, Object> values) {
        Vote full = (Vote) values.get("vote");
        return switch (type) {
            case "full" -> full;
            default -> new AnonymousVote(full);
        };
    }
}
