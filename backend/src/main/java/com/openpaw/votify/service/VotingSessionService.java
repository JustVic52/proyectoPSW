package com.openpaw.votify.service;

import com.openpaw.votify.model.VotingSession;
import com.openpaw.votify.repository.VotingSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class VotingSessionService {

    @Autowired
    private VotingSessionRepository votingSessionRepository;

    public List<VotingSession> getAllVotingSessions() {
        return votingSessionRepository.findAll();
    }

    public List<VotingSession> getVotingSessionsByCategoryId(UUID categoryId) {
        return votingSessionRepository.findAllByCategoryId(categoryId);
    }

    public VotingSession getVotingSessionById(UUID id) {
        return votingSessionRepository.findById(id);
    }

    public VotingSession addVotingSession(VotingSession.Params params) {
        return votingSessionRepository.add(params);
    }

    public VotingSession modifyVotingSession(UUID id, VotingSession.Params params) {
        return votingSessionRepository.modify(id, params);
    }

    public VotingSession removeVotingSession(UUID id) {
        return votingSessionRepository.remove(id);
    }
}
