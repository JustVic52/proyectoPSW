package com.openpaw.votify.service;

import com.openpaw.votify.exception.DuplicateVoteException;
import com.openpaw.votify.factory.VoteFactory;
import com.openpaw.votify.model.AnonymousVote;
import com.openpaw.votify.model.Vote;
import com.openpaw.votify.model.VoteResponse;
import com.openpaw.votify.model.VotingSession;
import com.openpaw.votify.repository.CriterionValueRepository;
import com.openpaw.votify.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class VoteService {
    //TODO: Implement this on the Configurable work item.
    private static final boolean LIMIT_ONE_VOTE_PER_CATEGORY = true;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private CriterionValueRepository criterionValueRepository;

    @Autowired
    private VoteFactory voteFactory;

    @Autowired
    private VotingSessionService votingSessionService;

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
        VotingSession session = votingSessionService.getVotingSessionById(params.votingSessionId());
        if(LIMIT_ONE_VOTE_PER_CATEGORY && 
           voteRepository.existsByVoterIdAndCategoryId(Vote.PLACEHOLDER_VOTER_ID, session.getCategoryId()))
            throw new DuplicateVoteException("Only one vote per category is allowed for each user.");
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

    public double getVoteScore(UUID voteId) {
        return criterionValueRepository.calculateVoteScore(voteId);
    }

    public double getProjectFinalScore(UUID projectId, UUID votingSessionId) {
        List<Vote> votes = voteRepository.findByProjectIdAndVotingSessionId(projectId, votingSessionId);

        if (votes.isEmpty()) {
            return 0.0;
        }

        return votes.stream()
            .mapToDouble(vote -> criterionValueRepository.calculateVoteScore(vote.getId()))
            .average()
            .orElse(0.0);
    }
}
