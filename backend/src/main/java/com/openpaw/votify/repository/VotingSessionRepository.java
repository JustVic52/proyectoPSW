package com.openpaw.votify.repository;

import com.openpaw.votify.exception.NotFoundException;
import com.openpaw.votify.model.VotingSession;
import com.openpaw.votify.utils.VotingType;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Repository
public class VotingSessionRepository {

    private final JdbcTemplate jdbcTemplate;

    public VotingSessionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private VotingSession mapRow(ResultSet rs, int rowNum) throws SQLException {
        VotingSession voting = new VotingSession();
        voting.setId(UUID.fromString(rs.getString("id")));
        voting.setCategoryId(UUID.fromString(rs.getString("category_id")));
        voting.setVotingType(VotingType.valueOf(rs.getString("type").toUpperCase()));
        voting.setCanVoteOwnProject(rs.getBoolean("can_vote_own_project"));
        voting.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        voting.setStartTime(rs.getTimestamp("start_time").toLocalDateTime());
        voting.setEndTime(rs.getTimestamp("end_time").toLocalDateTime());
        return voting;
    }

    public List<VotingSession> findAll() {
        String sql = "SELECT * FROM voting_sessions";
        return jdbcTemplate.query(sql, this::mapRow);
    }

    public List<VotingSession> findAllByCategoryId(UUID categoryId) {
        String sql = "SELECT * FROM voting_sessions WHERE category_id = ?::uuid";
        return jdbcTemplate.query(sql, this::mapRow, categoryId.toString());
    }

    public VotingSession findById(UUID id) {
        try {
            String sql = "SELECT * FROM voting_sessions WHERE id = ?::uuid";
            return jdbcTemplate.queryForObject(sql, this::mapRow, id.toString());
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Voting session not found: " + id);
        }
    }

    public VotingSession add(VotingSession.Params params) {
        String sql = "INSERT INTO voting_sessions (category_id, type, can_vote_own_project, start_time, end_time) VALUES (?::uuid, ?::voting_type, ?, ?, ?) RETURNING *";
        return jdbcTemplate.queryForObject(sql, this::mapRow,
                params.categoryId().toString(),
                params.votingType().name().toLowerCase(),
                params.canVoteOwnProject(),
                params.startTime(),
                params.endTime());
    }

    public VotingSession modify(UUID id, VotingSession.Params params) {
        try {
            String sql = "UPDATE voting_sessions SET category_id = ?::uuid, type = ?::voting_type, can_vote_own_project = ?, start_time = ?, end_time = ? WHERE id = ?::uuid RETURNING *";
            return jdbcTemplate.queryForObject(sql, this::mapRow,
                    params.categoryId().toString(),
                    params.votingType().name().toLowerCase(),
                    params.canVoteOwnProject(),
                    params.startTime(),
                    params.endTime(),
                    id.toString());
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Voting session not found: " + id);
        }
    }

    public VotingSession remove(UUID id) {
        VotingSession voting = findById(id);
        String sql = "DELETE FROM voting_sessions WHERE id = ?::uuid";
        jdbcTemplate.update(sql, id.toString());
        return voting;
    }
}
