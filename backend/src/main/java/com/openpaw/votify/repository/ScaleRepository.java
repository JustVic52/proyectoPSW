package com.openpaw.votify.repository;

import com.openpaw.votify.exception.NotFoundException;
import com.openpaw.votify.model.Scale;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Repository
public class ScaleRepository {

    private final JdbcTemplate jdbcTemplate;

    public ScaleRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private Scale mapRow(ResultSet rs, int rowNum) throws SQLException {
        Scale scale = new Scale();
        scale.setId(UUID.fromString(rs.getString("id")));
        scale.setVotingSessionId(UUID.fromString(rs.getString("voting_session_id")));
        scale.setDescription(rs.getString("description"));
        scale.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        return scale;
    }

    public List<Scale> findAll() {
        String sql = "SELECT * FROM scales";
        return jdbcTemplate.query(sql, this::mapRow);
    }

    public Scale findById(UUID id) {
        try {
            String sql = "SELECT * FROM scales WHERE id = ?::uuid";
            return jdbcTemplate.queryForObject(sql, this::mapRow, id.toString());
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Scale not found: " + id);
        }
    }

    public List<Scale> findByVotingSessionId(UUID votingSessionId) {
        String sql = "SELECT * FROM scales WHERE voting_session_id = ?::uuid";
        return jdbcTemplate.query(sql, this::mapRow, votingSessionId.toString());
    }

    public Scale add(Scale.Params params) {
        String sql = "INSERT INTO scales (voting_session_id, description) VALUES (?::uuid, ?) RETURNING *";
        return jdbcTemplate.queryForObject(sql, this::mapRow,
                params.votingSessionId().toString(),
                params.description());
    }

    public Scale modify(UUID id, Scale.Params params) {
        try {
            String sql = "UPDATE scales SET voting_session_id = ?::uuid, description = ? WHERE id = ?::uuid RETURNING *";
            return jdbcTemplate.queryForObject(sql, this::mapRow,
                    params.votingSessionId().toString(),
                    params.description(),
                    id.toString());
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Scale not found: " + id);
        }
    }

    public Scale remove(UUID id) {
        Scale scale = findById(id);
        String sql = "DELETE FROM scales WHERE id = ?::uuid";
        jdbcTemplate.update(sql, id.toString());
        return scale;
    }
}
