package com.openpaw.votify.controller;

import com.openpaw.votify.model.AnonymousVoteResult;
import com.openpaw.votify.model.Vote;
import com.openpaw.votify.model.VoteResponse;
import com.openpaw.votify.model.VoteResult;
import com.openpaw.votify.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class VoteController {

    @Autowired
    private VoteService voteService;

    @GetMapping("/api/votes")
    public ResponseEntity<List<AnonymousVoteResult>> getAllAnonymousVotes() {
        return ResponseEntity.ok(voteService.getAllAnonymousVotes());
    }

    @GetMapping("/api/votes/full")
    public ResponseEntity<List<VoteResult>> getAllVotes() {
        return ResponseEntity.ok(voteService.getAllVotes());
    }

    @PostMapping("/api/votes")
    public ResponseEntity<AnonymousVoteResult> addVote(@RequestBody Vote.Params params) {
        return ResponseEntity.status(201).body(voteService.addVote(params));
    }

    @PostMapping("/api/vote")
    public ResponseEntity<VoteResponse> addVoteWithCriteria(@RequestBody VoteResponse.Params params) {
        return ResponseEntity.status(201).body(voteService.addVoteWithCriteria(params));
    }

    @DeleteMapping("/api/votes/{id}")
    public ResponseEntity<VoteResult> removeVote(@PathVariable UUID id) {
        return ResponseEntity.ok(voteService.removeVote(id));
    }
}
