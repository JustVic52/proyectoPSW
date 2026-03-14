package com.openpaw.votify.controller;

import com.openpaw.votify.model.Project;
import com.openpaw.votify.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable UUID id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping
    public ResponseEntity<Project> addProject(@RequestBody Project.Params params) {
        return ResponseEntity.status(201).body(projectService.addProject(params));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> modifyProject(@PathVariable UUID id, @RequestBody Project.Params params) {
        return ResponseEntity.ok(projectService.modifyProject(id, params));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Project> removeProject(@PathVariable UUID id) {
        return ResponseEntity.ok(projectService.removeProject(id));
    }
}
