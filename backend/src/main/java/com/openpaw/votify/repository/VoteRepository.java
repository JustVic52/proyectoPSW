package com.openpaw.votify.repository;

import com.openpaw.votify.exception.NotFoundException;
import com.openpaw.votify.model.AnonymousVote;
import com.openpaw.votify.model.CriterionValue;
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
}
