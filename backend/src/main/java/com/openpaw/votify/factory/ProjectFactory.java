package com.openpaw.votify.factory;

import com.openpaw.votify.model.Project;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Component
public class ProjectFactory implements EntityFactory<Project, Project.Params> {

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
    public Project fromParams(Project.Params params) {
        Project project = new Project();
        project.setTitle(params.title());
        project.setDescription(params.description());
        return project;
    }
}