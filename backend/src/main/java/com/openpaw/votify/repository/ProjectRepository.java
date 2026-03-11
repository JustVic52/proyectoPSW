package com.openpaw.votify.repository;

import com.openpaw.votify.factory.ProjectFactory;
import com.openpaw.votify.model.Project;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProjectRepository {
    private final JdbcTemplate jdbcTemplate;
    private final ProjectFactory projectFactory;

    public ProjectRepository(JdbcTemplate jdbcTemplate, ProjectFactory projectFactory) {
        this.jdbcTemplate = jdbcTemplate;
        this.projectFactory = projectFactory;
    }

    public List<Project> findAll() {
        String sql = "SELECT id, title, description, created_at FROM projects";
        return jdbcTemplate.query(sql, projectFactory::fromResultSet);
    }
}