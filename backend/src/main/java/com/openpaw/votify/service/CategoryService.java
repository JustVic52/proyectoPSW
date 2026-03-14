package com.openpaw.votify.service;

import com.openpaw.votify.model.Category;
import com.openpaw.votify.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(UUID id) {
        return categoryRepository.findById(id);
    }

    public Category addCategory(Category.Params params) {
        return categoryRepository.add(params);
    }

    public Category modifyCategory(UUID id, Category.Params params) {
        return categoryRepository.modify(id, params);
    }

    public Category removeCategory(UUID id) {
        return categoryRepository.remove(id);
    }
}
