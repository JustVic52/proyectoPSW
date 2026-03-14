package com.openpaw.votify.service;

import com.openpaw.votify.model.CategoryProject;
import com.openpaw.votify.repository.CategoryProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CategoryProjectService {

    @Autowired
    private CategoryProjectRepository categoryProjectRepository;

    public List<CategoryProject> getAllCategoryProjects() {
        return categoryProjectRepository.findAll();
    }

    public CategoryProject getCategoryProjectById(UUID id) {
        return categoryProjectRepository.findById(id);
    }

    public List<CategoryProject> getCategoryProjectsByCategoryId(UUID categoryId) {
        return categoryProjectRepository.findByCategoryId(categoryId);
    }

    public List<CategoryProject> getCategoryProjectsByProjectId(UUID projectId) {
        return categoryProjectRepository.findByProjectId(projectId);
    }

    public CategoryProject addCategoryProject(CategoryProject.Params params) {
        return categoryProjectRepository.add(params);
    }

    public CategoryProject removeCategoryProject(UUID id) {
        return categoryProjectRepository.remove(id);
    }
}
