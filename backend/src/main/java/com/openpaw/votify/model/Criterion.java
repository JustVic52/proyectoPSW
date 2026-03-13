package com.openpaw.votify.model;

import com.openpaw.votify.factory.Creatable;
import com.openpaw.votify.utils.CriterionType;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.UUID;

import static com.openpaw.votify.utils.CriterionType.*;

public class Criterion implements Creatable<Criterion, Criterion.Params> {
    public record Params(String name, CriterionType type, float weight) {}

    private UUID id;
    private LocalDateTime createdAt;
    private String name;
    private float weight;
    private CriterionType type;

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

    @Override
    public Criterion fromResultSet(ResultSet rs, int rowNum) throws SQLException {
        Criterion c = new Criterion();
        c.setId(UUID.fromString(rs.getString("id")));
        c.setName(rs.getString("name"));
        c.setWeight(rs.getFloat("weight"));
        c.setType(ConvertCriterionType(rs.getString("criterion_type")));
        c.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        return c;
    }

    private CriterionType ConvertCriterionType(String dbType) {
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

    @Override
    public Criterion fromParams(Params params) {
        Criterion c = new Criterion();
        c.setName(params.name());
        c.setType(params.type());
        c.setWeight(params.weight());
        return c;
    }

}
