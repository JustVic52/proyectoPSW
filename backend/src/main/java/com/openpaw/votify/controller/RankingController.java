package com.openpaw.votify.controller;

import com.openpaw.votify.model.RankingEntry;
import com.openpaw.votify.service.RankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rankings")
public class RankingController {

    @Autowired
    private RankingService rankingService;

    /**
     * GET /api/rankings/category/{categoryId}
     * Returns all projects in the given category ranked by their average weighted score.
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<RankingEntry>> getCategoryRanking(@PathVariable UUID categoryId) {
        return ResponseEntity.ok(rankingService.getRankingByCategory(categoryId));
    }

    /**
     * GET /api/rankings/global?categoryIds=uuid1,uuid2,...
     * Returns all projects across the given categories ranked by average weighted score.
     * Suitable for an event-level global leaderboard.
     */
    @GetMapping("/global")
    public ResponseEntity<List<RankingEntry>> getGlobalRanking(
            @RequestParam(name = "categoryIds") String categoryIds) {
        List<UUID> ids = Arrays.stream(categoryIds.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(UUID::fromString)
                .collect(Collectors.toList());
        return ResponseEntity.ok(rankingService.getGlobalRanking(ids));
    }
}
