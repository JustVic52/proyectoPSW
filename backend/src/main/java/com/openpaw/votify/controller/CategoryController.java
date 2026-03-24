package com.openpaw.votify.controller;

import com.openpaw.votify.model.Category;
import com.openpaw.votify.model.Project;
import com.openpaw.votify.service.CategoryService;
import com.openpaw.votify.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable UUID id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @GetMapping("/{categoryId}/projects")
    public ResponseEntity<List<Project>> getProjectsByCategory(@PathVariable UUID categoryId) {
        return ResponseEntity.ok(projectService.getProjectsByCategoryId(categoryId));
    }

    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody Category.Params params) {
        return ResponseEntity.status(201).body(categoryService.addCategory(params));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> modifyCategory(@PathVariable UUID id, @RequestBody Category.Params params) {
        return ResponseEntity.ok(categoryService.modifyCategory(id, params));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Category> removeCategory(@PathVariable UUID id) {
        return ResponseEntity.ok(categoryService.removeCategory(id));
    }
}
