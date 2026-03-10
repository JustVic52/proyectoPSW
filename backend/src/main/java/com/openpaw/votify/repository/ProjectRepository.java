package com.openpaw.votify.repository;

import com.openpaw.votify.factory.Factory;
import com.openpaw.votify.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class ProjectRepository {
    private final Factory<Project, Project.Params> projectFactory;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public ProjectRepository(JdbcTemplate jdbcTemplate, Factory<Project, Project.Params> projectFactory) {
        this.jdbcTemplate = jdbcTemplate;
        this.projectFactory = projectFactory;
    }

    public List<Project> findAll() {
        String sql = "SELECT id, title, description, created_at FROM projects";
        return jdbcTemplate.query(sql, projectFactory::fromResultSet);
    }
}