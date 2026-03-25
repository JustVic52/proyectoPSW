package com.openpaw.votify.service;

import com.openpaw.votify.model.RankingEntry;
import com.openpaw.votify.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RankingService {

    @Autowired
    private VoteRepository voteRepository;

    /**
     * Returns the ranked list of projects for a specific category, sorted by average score descending.
     */
    public List<RankingEntry> getRankingByCategory(UUID categoryId) {
        return voteRepository.findRankingByCategoryId(categoryId);
    }

    /**
     * Returns the global ranked list across all provided category IDs (global event ranking).
     */
    public List<RankingEntry> getGlobalRanking(List<UUID> categoryIds) {
        return voteRepository.findGlobalRankingByCategoryIds(categoryIds);
    }
}
