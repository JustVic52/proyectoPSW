package com.openpaw.votify.repository;

import com.openpaw.votify.exception.NotFoundException;
import com.openpaw.votify.model.AnonymousVote;
import com.openpaw.votify.model.CriterionValue;
import com.openpaw.votify.model.RankingEntry;
import com.openpaw.votify.model.Vote;
import com.openpaw.votify.model.VoteResponse;
import com.openpaw.votify.exception.LengthExceededException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class VoteRepository {

    private final JdbcTemplate jdbcTemplate;

    public VoteRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private Vote mapRow(ResultSet rs, int rowNum) throws SQLException {
        Vote vote = new Vote();
        vote.setId(UUID.fromString(rs.getString("id")));
        vote.setVoterId(UUID.fromString(rs.getString("voter_id")));
        vote.setProjectId(UUID.fromString(rs.getString("project_id")));
        vote.setVotingSessionId(UUID.fromString(rs.getString("voting_session_id")));
        vote.setComment(rs.getString("comment"));
        vote.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        return vote;
    }

    private CriterionValue mapCriterionValue(ResultSet rs, int rowNum) throws SQLException {
        CriterionValue cv = new CriterionValue();
        cv.setId(UUID.fromString(rs.getString("id")));
        cv.setVoteId(UUID.fromString(rs.getString("vote_id")));
        cv.setCriterionId(UUID.fromString(rs.getString("criterion_id")));
        cv.setNumericValue(rs.getFloat("numeric_value"));
        return cv;
    }

    public List<Vote> findAll() {
        String sql = "SELECT * FROM votes";
        return jdbcTemplate.query(sql, this::mapRow);
    }

    public Vote findById(UUID id) {
        try {
            String sql = "SELECT * FROM votes WHERE id = ?::uuid";
            return jdbcTemplate.queryForObject(sql, this::mapRow, id.toString());
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Vote not found: " + id);
        }
    }

    public Vote add(AnonymousVote.Params params) {
        if (isCommentShortEnough(params.comment())) {
            String sql = "INSERT INTO votes (voter_id, project_id, voting_session_id, comment) VALUES (?::uuid, ?::uuid, ?::uuid, ?) RETURNING *";
            return jdbcTemplate.queryForObject(sql, this::mapRow,
                    Vote.PLACEHOLDER_VOTER_ID.toString(),
                    params.projectId().toString(),
                    params.votingSessionId().toString(),
                    params.comment());
        }
        else { throw new LengthExceededException("Comment is too long; 500 characters max."); }
    }

    private boolean isCommentShortEnough(String comment) {
        return comment.length() <= 500;
    }

    public VoteResponse addWithCriteria(VoteResponse.Params params) {
        Vote vote = add(new AnonymousVote.Params(
                params.projectId(),
                params.votingSessionId(),
                params.comment()));

        List<CriterionValue> criterionValues = new ArrayList<>();
        String cvSql = "INSERT INTO criterion_values (vote_id, criterion_id, numeric_value) VALUES (?::uuid, ?::uuid, ?) RETURNING *";
        for (VoteResponse.CriterionValueInput cv : params.criterionValues()) {
            CriterionValue saved = jdbcTemplate.queryForObject(cvSql, this::mapCriterionValue,
                    vote.getId().toString(),
                    cv.criterionId().toString(),
                    cv.numericValue());
            criterionValues.add(saved);
        }

        return new VoteResponse(vote, criterionValues);
    }

    public Vote remove(UUID id) {
        Vote vote = findById(id);
        String sql = "DELETE FROM votes WHERE id = ?::uuid";
        jdbcTemplate.update(sql, id.toString());
        return vote;
    }
    
    public boolean existsByVoterIdAndCategoryId(UUID voterId, UUID categoryId) {
        String sql = "SELECT COUNT(*) FROM votes v JOIN voting_sessions vs ON v.voting_session_id = vs.id WHERE v.voter_id = ?::uuid AND vs.category_id = ?::uuid";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, voterId.toString(), categoryId.toString());
        return count != null && count > 0;
    }

    public List<Vote> findByProjectIdAndVotingSessionId(UUID projectId, UUID votingSessionId) {
        String sql = """
            SELECT *
            FROM votes
            WHERE project_id = ?::uuid
            AND voting_session_id = ?::uuid
            """;

        return jdbcTemplate.query(sql, this::mapRow, projectId.toString(), votingSessionId.toString());
    }

    public List<RankingEntry> findRankingByCategoryId(UUID categoryId) {
        String sql = """
            SELECT
                p.id          AS project_id,
                p.title       AS titulo,
                COUNT(DISTINCT v.id)                                   AS vote_count,
                COALESCE(AVG(vote_scores.vote_score), 0)               AS score
            FROM category_projects cp
            JOIN projects p ON cp.project_id = p.id
            JOIN voting_sessions vs ON vs.category_id = cp.category_id
            LEFT JOIN votes v ON v.project_id = p.id AND v.voting_session_id = vs.id
            LEFT JOIN (
                SELECT v2.id AS vote_id,
                       SUM(cv.numeric_value * c.weight) AS vote_score
                FROM votes v2
                JOIN criterion_values cv ON cv.vote_id = v2.id
                JOIN criteria c ON c.id = cv.criterion_id
                GROUP BY v2.id
            ) vote_scores ON vote_scores.vote_id = v.id
            WHERE cp.category_id = ?::uuid
            GROUP BY p.id, p.title
            ORDER BY score DESC
            """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new RankingEntry(
                UUID.fromString(rs.getString("project_id")),
                rs.getString("titulo"),
                rs.getDouble("score"),
                rs.getInt("vote_count")
        ), categoryId.toString());
    }

    public List<RankingEntry> findGlobalRankingByCategoryIds(List<UUID> categoryIds) {
        if (categoryIds == null || categoryIds.isEmpty()) return List.of();

        String placeholders = String.join(", ", categoryIds.stream().map(id -> "?::uuid").toList());
        String sql = """
            SELECT
                p.id          AS project_id,
                p.title       AS titulo,
                COUNT(DISTINCT v.id)                                   AS vote_count,
                COALESCE(AVG(vote_scores.vote_score), 0)               AS score
            FROM category_projects cp
            JOIN projects p ON cp.project_id = p.id
            JOIN voting_sessions vs ON vs.category_id = cp.category_id
            LEFT JOIN votes v ON v.project_id = p.id AND v.voting_session_id = vs.id
            LEFT JOIN (
                SELECT v2.id AS vote_id,
                       SUM(cv.numeric_value * c.weight) AS vote_score
                FROM votes v2
                JOIN criterion_values cv ON cv.vote_id = v2.id
                JOIN criteria c ON c.id = cv.criterion_id
                GROUP BY v2.id
            ) vote_scores ON vote_scores.vote_id = v.id
            WHERE cp.category_id IN (%s)
            GROUP BY p.id, p.title
            ORDER BY score DESC
            """.formatted(placeholders);

        Object[] args = categoryIds.stream().map(UUID::toString).toArray();
        return jdbcTemplate.query(sql, (rs, rowNum) -> new RankingEntry(
                UUID.fromString(rs.getString("project_id")),
                rs.getString("titulo"),
                rs.getDouble("score"),
                rs.getInt("vote_count")
        ), args);
    }
}
