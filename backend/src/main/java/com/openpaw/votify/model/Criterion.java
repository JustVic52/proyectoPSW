package com.openpaw.votify.model;

import com.openpaw.votify.utils.CriterionType;
import java.time.LocalDateTime;
import java.util.UUID;

import static com.openpaw.votify.utils.CriterionType.*;

public class Criterion {
    public record Params(UUID scaleId, String name, CriterionType type, float weight) {}

    private UUID id;
    private LocalDateTime createdAt;
    private String name;
    private float weight;
    private CriterionType type;
    private UUID scaleID;

    public static CriterionType convertCriterionType(String dbType) {
        return switch (dbType) {
            case "multiple_choice" -> MULTIPLE_CHOICE;
            case "single_choice" -> SINGLE_CHOICE;
            default -> NUMERIC;
        };
    }

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
}
