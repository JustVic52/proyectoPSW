package com.openpaw.votify.service;

import com.openpaw.votify.model.Scale;
import com.openpaw.votify.repository.ScaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ScaleService {

    @Autowired
    private ScaleRepository scaleRepository;

    public List<Scale> getAllScales() {
        return scaleRepository.findAll();
    }

    public Scale getScaleById(UUID id) {
        return scaleRepository.findById(id);
    }

    public List<Scale> getScalesByVotingSessionId(UUID votingSessionId) {
        return scaleRepository.findByVotingSessionId(votingSessionId);
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
