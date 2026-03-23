package com.openpaw.votify.repository;

import com.openpaw.votify.exception.NotFoundException;
import com.openpaw.votify.model.CriterionValue;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Repository
public class CriterionValueRepository {

    private final JdbcTemplate jdbcTemplate;

    public CriterionValueRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private CriterionValue mapRow(ResultSet rs, int rowNum) throws SQLException {
        CriterionValue cv = new CriterionValue();
        cv.setId(UUID.fromString(rs.getString("id")));
        cv.setCriterionId(UUID.fromString(rs.getString("criterion_id")));
        cv.setVoteId(UUID.fromString(rs.getString("vote_id")));
        cv.setNumericValue(rs.getFloat("numeric_value"));
        return cv;
    }

    public List<CriterionValue> findAll() {
        String sql = "SELECT * FROM criterion_values";
        return jdbcTemplate.query(sql, this::mapRow);
    }

    public List<CriterionValue> findByVoteId(UUID voteId) {
        String sql = "SELECT * FROM criterion_values WHERE vote_id = ?::uuid";
        return jdbcTemplate.query(sql, this::mapRow, voteId.toString());
    }

    public CriterionValue findById(UUID id) {
        try {
            String sql = "SELECT * FROM criterion_values WHERE id = ?::uuid";
            return jdbcTemplate.queryForObject(sql, this::mapRow, id.toString());
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("CriterionValue not found: " + id);
        }
    }

    public CriterionValue add(CriterionValue.Params params) {
        String sql = "INSERT INTO criterion_values (criterion_id, vote_id, numeric_value) VALUES (?::uuid, ?::uuid, ?) RETURNING *";
        return jdbcTemplate.queryForObject(sql, this::mapRow,
                params.criterionId().toString(),
                params.voteId().toString(),
                params.numericValue());
    }

    public CriterionValue remove(UUID id) {
        CriterionValue cv = findById(id);
        String sql = "DELETE FROM criterion_values WHERE id = ?::uuid";
        jdbcTemplate.update(sql, id.toString());
        return cv;
    }

    public Double calculateVoteScore(UUID voteId) {
        String sql = """
            SELECT SUM(cv.numeric_value * c.weight)
            FROM criterion_values cv
            JOIN criteria c ON cv.criterion_id = c.id
            WHERE cv.vote_id = ?::uuid
            """;

        Double score = jdbcTemplate.queryForObject(sql, Double.class, voteId.toString());
        return score != null ? score : 0.0;
    }
}
