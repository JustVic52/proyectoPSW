package com.openpaw.votify.controller;

import com.openpaw.votify.model.AnonymousVote;
import com.openpaw.votify.model.Vote;
import com.openpaw.votify.model.VoteResponse;
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
    public ResponseEntity<List<AnonymousVote>> getAllAnonymousVotes() {
        return ResponseEntity.ok(voteService.getAllAnonymousVotes());
    }

    @GetMapping("/api/votes/full")
    public ResponseEntity<List<Vote>> getAllVotes() {
        return ResponseEntity.ok(voteService.getAllVotes());
    }

    @PostMapping("/api/votes")
    public ResponseEntity<AnonymousVote> addVote(@RequestBody AnonymousVote.Params params) {
        return ResponseEntity.status(201).body(voteService.addVote(params));
    }

    @PostMapping("/api/vote")
    public ResponseEntity<VoteResponse> addVoteWithCriteria(@RequestBody VoteResponse.Params params) {
        return ResponseEntity.status(201).body(voteService.addVoteWithCriteria(params));
    }

    @DeleteMapping("/api/votes/{id}")
    public ResponseEntity<Vote> removeVote(@PathVariable UUID id) {
        return ResponseEntity.ok(voteService.removeVote(id));
    }
}
