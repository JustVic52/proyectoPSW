package com.openpaw.votify.service;

import com.openpaw.votify.model.Criterion;
import com.openpaw.votify.repository.CriterionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CriterionService {

    @Autowired
    private CriterionRepository criterionRepository;

    public List<Criterion> getCriteria() {
        return criterionRepository.findAll();
    }

    public Criterion addCriterion(Criterion.Params params) {
        return criterionRepository.add(params);
    }
}
