package com.openpaw.votify.factory;

import com.openpaw.votify.model.Project;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Component
public class ProjectFactory implements EntityFactory<Project> {

    @Override
    public Project create(String type, Map<String, Object> values) {
        Project project = new Project();
        project.setId((UUID) values.get("id"));
        project.setTitle((String) values.get("title"));
        project.setDescription((String) values.get("description"));
        project.setCreatedAt((LocalDateTime) values.get("createdAt"));
        return project;
    }
}
