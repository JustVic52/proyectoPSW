package com.openpaw.votify.controller;

import com.openpaw.votify.model.VotingSession;
import com.openpaw.votify.service.VotingSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/voting-sessions")
public class VotingSessionController {

    @Autowired
    private VotingSessionService votingSessionService;

    @GetMapping
    public ResponseEntity<List<VotingSession>> getAllVotingSessions() {
        return ResponseEntity.ok(votingSessionService.getAllVotingSessions());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<VotingSession>> getVotingSessionsByCategoryId(@PathVariable UUID categoryId) {
        return ResponseEntity.ok(votingSessionService.getVotingSessionsByCategoryId(categoryId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VotingSession> getVotingSessionById(@PathVariable UUID id) {
        return ResponseEntity.ok(votingSessionService.getVotingSessionById(id));
    }

    @PostMapping
    public ResponseEntity<VotingSession> addVotingSession(@RequestBody VotingSession.Params params) {
        return ResponseEntity.status(201).body(votingSessionService.addVotingSession(params));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VotingSession> modifyVotingSession(@PathVariable UUID id, @RequestBody VotingSession.Params params) {
        return ResponseEntity.ok(votingSessionService.modifyVotingSession(id, params));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<VotingSession> removeVotingSession(@PathVariable UUID id) {
        return ResponseEntity.ok(votingSessionService.removeVotingSession(id));
    }
}
