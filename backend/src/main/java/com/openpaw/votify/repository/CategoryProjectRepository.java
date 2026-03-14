package com.openpaw.votify.repository;

import com.openpaw.votify.exception.NotFoundException;
import com.openpaw.votify.model.CategoryProject;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Repository
public class CategoryProjectRepository {

    private final JdbcTemplate jdbcTemplate;

    public CategoryProjectRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private CategoryProject mapRow(ResultSet rs, int rowNum) throws SQLException {
        CategoryProject categoryProject = new CategoryProject();
        categoryProject.setId(UUID.fromString(rs.getString("id")));
        categoryProject.setProjectId(UUID.fromString(rs.getString("project_id")));
        categoryProject.setCategoryId(UUID.fromString(rs.getString("category_id")));
        return categoryProject;
    }

    public List<CategoryProject> findAll() {
        String sql = "SELECT * FROM category_projects";
        return jdbcTemplate.query(sql, this::mapRow);
    }

    public CategoryProject findById(UUID id) {
        try {
            String sql = "SELECT * FROM category_projects WHERE id = ?::uuid";
            return jdbcTemplate.queryForObject(sql, this::mapRow, id.toString());
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("CategoryProject not found: " + id);
        }
    }

    public List<CategoryProject> findByCategoryId(UUID categoryId) {
        String sql = "SELECT * FROM category_projects WHERE category_id = ?::uuid";
        return jdbcTemplate.query(sql, this::mapRow, categoryId.toString());
    }

    public List<CategoryProject> findByProjectId(UUID projectId) {
        String sql = "SELECT * FROM category_projects WHERE project_id = ?::uuid";
        return jdbcTemplate.query(sql, this::mapRow, projectId.toString());
    }

    public CategoryProject add(CategoryProject.Params params) {
        String sql = "INSERT INTO category_projects (project_id, category_id) VALUES (?::uuid, ?::uuid) RETURNING *";
        return jdbcTemplate.queryForObject(sql, this::mapRow,
                params.projectId().toString(),
                params.categoryId().toString());
    }

    public CategoryProject remove(UUID id) {
        CategoryProject categoryProject = findById(id);
        String sql = "DELETE FROM category_projects WHERE id = ?::uuid";
        jdbcTemplate.update(sql, id.toString());
        return categoryProject;
    }
}
