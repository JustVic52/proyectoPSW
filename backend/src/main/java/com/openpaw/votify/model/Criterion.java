package com.openpaw.votify.model;

import com.openpaw.votify.utils.CriterionType;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.UUID;

import static com.openpaw.votify.utils.CriterionType.*;

public class Criterion {
    public record Params(String name, CriterionType type, float weight) {}

    private UUID id;
    private LocalDateTime createdAt;
    private String name;
    private float weight;
    private CriterionType type;
    private UUID scaleID;

    public UUID getId() { return id; }

    public void setId(UUID id) { this.id = id; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public float getWeight() { return weight; }

    public void setWeight(float weight) { this.weight = weight; }

    public CriterionType getType() { return type; }

    public void setType(CriterionType type) { this.type = type; }

    public UUID getScaleID() { return scaleID; }

    public void setScaleID(UUID scaleID) { this.scaleID = scaleID; }

    public CriterionType convertCriterionType(String dbType) {
        CriterionType tempType;
        switch (dbType) {
            case "multiple_choice":
                tempType = MULTIPLE_CHOICE;
                break;
            case "single_choice":
                tempType = SINGLE_CHOICE;
                break;
            default:
                tempType = NUMERIC; //it's the db default
                break;
        }
        return tempType;
    }

}
