package com.openpaw.votify.controller;

import com.openpaw.votify.model.Criterion;
import com.openpaw.votify.service.CriterionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import java.util.List;

@RestController
@RequestMapping("/api/criteria")
public class CriterionController {

    @Autowired
    private CriterionService criterionService;

    @GetMapping
    public ResponseEntity<List<Criterion>> getCriteria() {
        return ResponseEntity.ok(criterionService.getCriteria());
    }

    @PostMapping
    public ResponseEntity<Criterion> addCriterion(@RequestBody Criterion.Params params) {
        return ResponseEntity.status(201).body(criterionService.addCriterion(params));
    }
}
