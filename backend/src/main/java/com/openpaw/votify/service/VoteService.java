package com.openpaw.votify.service;

import com.openpaw.votify.factory.VoteFactory;
import com.openpaw.votify.model.AnonymousVote;
import com.openpaw.votify.model.Vote;
import com.openpaw.votify.model.VoteResponse;
import com.openpaw.votify.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private VoteFactory voteFactory;

    private Map<String, Object> toMap(Vote vote) {
        return Map.of("vote", vote);
    }

    public List<AnonymousVote> getAllAnonymousVotes() {
        return voteRepository.findAll().stream()
                .map(v -> voteFactory.create("anonymous", toMap(v)))
                .toList();
    }

    public List<Vote> getAllVotes() {
        return voteRepository.findAll().stream()
                .map(v -> (Vote) voteFactory.create("full", toMap(v)))
                .toList();
    }

    public AnonymousVote addVote(AnonymousVote.Params params) {
        Vote vote = voteRepository.add(params);
        return voteFactory.create("anonymous", toMap(vote));
    }

    public VoteResponse addVoteWithCriteria(VoteResponse.Params params) {
        return voteRepository.addWithCriteria(params);
    }

    public Vote removeVote(UUID id) {
        Vote vote = voteRepository.remove(id);
        return (Vote) voteFactory.create("full", toMap(vote));
    }
}
