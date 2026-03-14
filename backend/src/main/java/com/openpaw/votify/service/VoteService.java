package com.openpaw.votify.service;

import com.openpaw.votify.factory.VoteFactory;
import com.openpaw.votify.model.AnonymousVoteResult;
import com.openpaw.votify.model.Vote;
import com.openpaw.votify.model.VoteResponse;
import com.openpaw.votify.model.VoteResult;
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
        return Map.of(
                "id", vote.getId(),
                "voterId", vote.getVoterId(),
                "projectId", vote.getProjectId(),
                "votingSessionId", vote.getVotingSessionId(),
                "comment", vote.getComment() != null ? vote.getComment() : "",
                "createdAt", vote.getCreatedAt()
        );
    }

    public List<AnonymousVoteResult> getAllAnonymousVotes() {
        return voteRepository.findAll().stream()
                .map(v -> (AnonymousVoteResult) voteFactory.create("anonymous", toMap(v)))
                .toList();
    }

    public List<VoteResult> getAllVotes() {
        return voteRepository.findAll().stream()
                .map(v -> (VoteResult) voteFactory.create("full", toMap(v)))
                .toList();
    }

    public AnonymousVoteResult addVote(Vote.Params params) {
        Vote vote = voteRepository.add(params);
        return (AnonymousVoteResult) voteFactory.create("anonymous", toMap(vote));
    }

    public VoteResponse addVoteWithCriteria(VoteResponse.Params params) {
        return voteRepository.addWithCriteria(params);
    }

    public VoteResult removeVote(UUID id) {
        Vote vote = voteRepository.remove(id);
        return (VoteResult) voteFactory.create("full", toMap(vote));
    }
}
