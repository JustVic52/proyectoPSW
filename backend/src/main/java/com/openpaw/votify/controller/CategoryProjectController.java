package com.openpaw.votify.controller;

import com.openpaw.votify.model.CategoryProject;
import com.openpaw.votify.service.CategoryProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/category-projects")
public class CategoryProjectController {

    @Autowired
    private CategoryProjectService categoryProjectService;

    @GetMapping
    public ResponseEntity<List<CategoryProject>> getAllCategoryProjects() {
        return ResponseEntity.ok(categoryProjectService.getAllCategoryProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryProject> getCategoryProjectById(@PathVariable UUID id) {
        return ResponseEntity.ok(categoryProjectService.getCategoryProjectById(id));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<CategoryProject>> getCategoryProjectsByCategoryId(@PathVariable UUID categoryId) {
        return ResponseEntity.ok(categoryProjectService.getCategoryProjectsByCategoryId(categoryId));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<CategoryProject>> getCategoryProjectsByProjectId(@PathVariable UUID projectId) {
        return ResponseEntity.ok(categoryProjectService.getCategoryProjectsByProjectId(projectId));
    }

    @PostMapping
    public ResponseEntity<CategoryProject> addCategoryProject(@RequestBody CategoryProject.Params params) {
        return ResponseEntity.status(201).body(categoryProjectService.addCategoryProject(params));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CategoryProject> removeCategoryProject(@PathVariable UUID id) {
        return ResponseEntity.ok(categoryProjectService.removeCategoryProject(id));
    }
}
