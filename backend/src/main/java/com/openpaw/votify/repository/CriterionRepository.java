package com.openpaw.votify.repository;

import com.openpaw.votify.model.Criterion;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Repository
public class CriterionRepository {

    private final JdbcTemplate jdbcTemplate;

    public CriterionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private Criterion mapRow(ResultSet rs, int rowNum) throws SQLException {
        Criterion c = new Criterion();
        c.setId(UUID.fromString(rs.getString("id")));
        c.setScaleID(UUID.fromString(rs.getString("scale_id")));
        c.setName(rs.getString("name"));
        c.setWeight(rs.getFloat("weight"));
        c.setType(Criterion.convertCriterionType(rs.getString("type")));
        c.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        return c;
    }

    public List<Criterion> findAll() {
        String sql = "SELECT * FROM criteria";
        return jdbcTemplate.query(sql, this::mapRow);
    }

    public Criterion add(Criterion.Params params) {
        String sql = "INSERT INTO criteria (scale_id, name, type, weight) VALUES (?::uuid, ?, ?::criterion_type, ?) RETURNING *";
        return jdbcTemplate.queryForObject(sql, this::mapRow,
                params.scaleId().toString(),
                params.name(),
                params.type().name().toLowerCase(),
                params.weight());
    }

    public List<Criterion> findByScaleId(UUID scaleId) {
        String sql = "SELECT * FROM criteria WHERE scale_id = ?";
        return jdbcTemplate.query(sql, this::mapRow, scaleId);
    }
}
