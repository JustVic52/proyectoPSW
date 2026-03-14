package com.openpaw.votify.repository;

import com.openpaw.votify.exception.NotFoundException;
import com.openpaw.votify.model.Project;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Repository
public class ProjectRepository {

    private final JdbcTemplate jdbcTemplate;

    public ProjectRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private Project mapRow(ResultSet rs, int rowNum) throws SQLException {
        Project p = new Project();
        p.setId(UUID.fromString(rs.getString("id")));
        p.setTitle(rs.getString("title"));
        p.setDescription(rs.getString("description"));
        p.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        return p;
    }

    public List<Project> findAll() {
        String sql = "SELECT * FROM projects";
        return jdbcTemplate.query(sql, this::mapRow);
    }

    public Project findById(UUID id) {
        try {
            String sql = "SELECT * FROM projects WHERE id = ?::uuid";
            return jdbcTemplate.queryForObject(sql, this::mapRow, id.toString());
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Project not found: " + id);
        }
    }

    public Project add(Project.Params params) {
        String sql = "INSERT INTO projects (title, description) VALUES (?, ?) RETURNING *";
        return jdbcTemplate.queryForObject(sql, this::mapRow,
                params.title(),
                params.description());
    }

    public Project modify(UUID id, Project.Params params) {
        try {
            String sql = "UPDATE projects SET title = ?, description = ? WHERE id = ?::uuid RETURNING *";
            return jdbcTemplate.queryForObject(sql, this::mapRow,
                    params.title(),
                    params.description(),
                    id.toString());
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Project not found: " + id);
        }
    }

    public Project remove(UUID id) {
        Project project = findById(id);
        String sql = "DELETE FROM projects WHERE id = ?::uuid";
        jdbcTemplate.update(sql, id.toString());
        return project;
    }
}
