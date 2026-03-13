package com.openpaw.votify.repository;

import com.openpaw.votify.factory.Factory;
import com.openpaw.votify.model.Criterion;
import com.openpaw.votify.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CriterionRepository {
    private final Factory<Criterion, Criterion.Params> criterionFactory;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public CriterionRepository(JdbcTemplate jdbcTemplate, Factory<Criterion, Criterion.Params> criterionFactory) {
        this.jdbcTemplate = jdbcTemplate;
        this.criterionFactory = criterionFactory;
    }

    public List<Criterion> findAll() {
        String sql = "SELECT id, created_at, name, weitght, type, scale_id FROM criteria";
        return jdbcTemplate.query(sql, criterionFactory::fromResultSet);
    }
}