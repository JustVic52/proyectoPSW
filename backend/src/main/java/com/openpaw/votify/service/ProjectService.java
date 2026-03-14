package com.openpaw.votify.service;

import com.openpaw.votify.model.CategoryProject;
import com.openpaw.votify.model.Project;
import com.openpaw.votify.repository.CategoryProjectRepository;
import com.openpaw.votify.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private CategoryProjectRepository categoryProjectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(UUID id) {
        return projectRepository.findById(id);
    }

    public Project addProject(Project.Params params) {
        Project project = projectRepository.add(params);
        categoryProjectRepository.add(new CategoryProject.Params(project.getId(), params.categoryId()));
        return project;
    }

    public Project modifyProject(UUID id, Project.Params params) {
        return projectRepository.modify(id, params);
    }

    public Project removeProject(UUID id) {
        return projectRepository.remove(id);
    }
}
