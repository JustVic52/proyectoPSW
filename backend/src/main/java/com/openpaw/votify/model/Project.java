package com.openpaw.votify.model;

import com.openpaw.votify.factory.Creatable;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.UUID;


public class Project implements Creatable<Project, Project.Params> {
    public record Params(String title, String description) {}

    private UUID id;
    private String title;
    private String description;
    private LocalDateTime createdAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public Project fromResultSet(ResultSet rs, int rowNum) throws SQLException {
        Project p = new Project();
        p.setId(UUID.fromString(rs.getString("id")));
        p.setTitle(rs.getString("title"));
        p.setDescription(rs.getString("description"));
        p.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        return p;
    }

    @Override
    public Project fromParams(Params params) {
        Project project = new Project();
        project.setTitle(params.title());
        project.setDescription(params.description());
        return project;
    }
}
