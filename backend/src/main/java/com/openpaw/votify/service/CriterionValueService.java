package com.openpaw.votify.service;

import com.openpaw.votify.model.CriterionValue;
import com.openpaw.votify.repository.CriterionValueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CriterionValueService {

    @Autowired
    private CriterionValueRepository criterionValueRepository;

    public List<CriterionValue> getAllCriterionValues() {
        return criterionValueRepository.findAll();
    }

    public List<CriterionValue> getCriterionValuesByVoteId(UUID voteId) {
        return criterionValueRepository.findByVoteId(voteId);
    }

    public CriterionValue getCriterionValueById(UUID id) {
        return criterionValueRepository.findById(id);
    }

    public CriterionValue addCriterionValue(CriterionValue.Params params) {
        return criterionValueRepository.add(params);
    }

    public CriterionValue removeCriterionValue(UUID id) {
        return criterionValueRepository.remove(id);
    }
}
