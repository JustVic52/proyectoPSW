package com.openpaw.votify.repository;

import com.openpaw.votify.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class ProjectRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Project> findAll() {
        String sql = "SELECT id, title, description, created_at FROM projects";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Project p = new Project();
            p.setId(UUID.fromString(rs.getString("id")));
            p.setTitle(rs.getString("title"));
            p.setDescription(rs.getString("description"));
            p.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
            return p;
        });
    }
}
