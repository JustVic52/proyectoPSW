package com.openpaw.votify.service;

import com.openpaw.votify.model.Scale;
import com.openpaw.votify.model.ScaleWithCriteria;
import com.openpaw.votify.model.Criterion;
import com.openpaw.votify.repository.ScaleRepository;
import com.openpaw.votify.repository.CriterionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import java.util.stream.Collectors;

@Service
public class ScaleService {

    @Autowired
    private ScaleRepository scaleRepository;

    @Autowired
    private CriterionRepository criterionRepository;

    public List<Scale> getAllScales() {
        return scaleRepository.findAll();
    }

    public Scale getScaleById(UUID id) {
        return scaleRepository.findById(id);
    }

    public List<Scale> getScalesByVotingSessionId(UUID votingSessionId) {
        return scaleRepository.findByVotingSessionId(votingSessionId);
    }

    public List<ScaleWithCriteria> getScalesWithCriteriaByVotingSessionId(UUID votingSessionId) {
        List<Scale> scales = scaleRepository.findByVotingSessionId(votingSessionId);
        return scales.stream().map(scale -> {
            List<Criterion> criteria = criterionRepository.findByScaleId(scale.getId());
            return new ScaleWithCriteria(scale, criteria);
        }).collect(Collectors.toList());
    }

    public Scale addScale(Scale.Params params) {
        return scaleRepository.add(params);
    }

    public Scale modifyScale(UUID id, Scale.Params params) {
        return scaleRepository.modify(id, params);
    }

    public Scale removeScale(UUID id) {
        return scaleRepository.remove(id);
    }
}
