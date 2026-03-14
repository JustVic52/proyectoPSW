package com.openpaw.votify.controller;

import com.openpaw.votify.model.CriterionValue;
import com.openpaw.votify.service.CriterionValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/criterion-values")
public class CriterionValueController {

    @Autowired
    private CriterionValueService criterionValueService;

    @GetMapping
    public ResponseEntity<List<CriterionValue>> getAllCriterionValues() {
        return ResponseEntity.ok(criterionValueService.getAllCriterionValues());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CriterionValue> getCriterionValueById(@PathVariable UUID id) {
        return ResponseEntity.ok(criterionValueService.getCriterionValueById(id));
    }

    @GetMapping("/vote/{voteId}")
    public ResponseEntity<List<CriterionValue>> getCriterionValuesByVoteId(@PathVariable UUID voteId) {
        return ResponseEntity.ok(criterionValueService.getCriterionValuesByVoteId(voteId));
    }

    @PostMapping
    public ResponseEntity<CriterionValue> addCriterionValue(@RequestBody CriterionValue.Params params) {
        return ResponseEntity.status(201).body(criterionValueService.addCriterionValue(params));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CriterionValue> removeCriterionValue(@PathVariable UUID id) {
        return ResponseEntity.ok(criterionValueService.removeCriterionValue(id));
    }
}
