package com.openpaw.votify.controller;

import com.openpaw.votify.model.Scale;
import com.openpaw.votify.service.ScaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/scales")
public class ScaleController {

    @Autowired
    private ScaleService scaleService;

    @GetMapping
    public ResponseEntity<List<Scale>> getAllScales() {
        return ResponseEntity.ok(scaleService.getAllScales());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Scale> getScaleById(@PathVariable UUID id) {
        return ResponseEntity.ok(scaleService.getScaleById(id));
    }

    @GetMapping("/voting-session/{votingSessionId}")
    public ResponseEntity<List<Scale>> getScalesByVotingSessionId(@PathVariable UUID votingSessionId) {
        return ResponseEntity.ok(scaleService.getScalesByVotingSessionId(votingSessionId));
    }

    @PostMapping
    public ResponseEntity<Scale> addScale(@RequestBody Scale.Params params) {
        return ResponseEntity.status(201).body(scaleService.addScale(params));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Scale> modifyScale(@PathVariable UUID id, @RequestBody Scale.Params params) {
        return ResponseEntity.ok(scaleService.modifyScale(id, params));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Scale> removeScale(@PathVariable UUID id) {
        return ResponseEntity.ok(scaleService.removeScale(id));
    }
}
