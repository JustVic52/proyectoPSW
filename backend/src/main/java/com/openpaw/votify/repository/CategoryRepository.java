package com.openpaw.votify.repository;

import com.openpaw.votify.exception.NotFoundException;
import com.openpaw.votify.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Repository
public class CategoryRepository {
    @Autowired
    private final JdbcTemplate jdbcTemplate;

    public CategoryRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private Category mapRow(ResultSet rs, int rowNum) throws SQLException {
        Category category = new Category();
        category.setId(UUID.fromString(rs.getString("id")));
        category.setName(rs.getString("name"));
        category.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        return category;
    }

    public List<Category> findAll() {
        String sql = "SELECT * FROM categories";
        return jdbcTemplate.query(sql, this::mapRow);
    }

    public Category findById(UUID id) {
        try {
            String sql = "SELECT * FROM categories WHERE id = ?::uuid";
            return jdbcTemplate.queryForObject(sql, this::mapRow, id.toString());
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Category not found: " + id);
        }
    }

    public Category add(Category.Params params) {
        String sql = "INSERT INTO categories (name) VALUES (?) RETURNING *";
        return jdbcTemplate.queryForObject(sql, this::mapRow, params.name());
    }

    public Category modify(UUID id, Category.Params params) {
        try {
            String sql = "UPDATE categories SET name = ? WHERE id = ?::uuid RETURNING *";
            return jdbcTemplate.queryForObject(sql, this::mapRow, params.name(), id.toString());
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Category not found: " + id);
        }
    }

    public Category remove(UUID id) {
        Category category = findById(id);
        String sql = "DELETE FROM categories WHERE id = ?::uuid";
        jdbcTemplate.update(sql, id.toString());
        return category;
    }
}
