package com.openpaw.votify.model;

import com.openpaw.votify.factory.Creatable;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.UUID;

public class Criteria implements Creatable<Criteria, Criteria.Params> {
    public record Params(String name, String type) {}

    private UUID id;
    private LocalDateTime createdAt;
    private String name;
    private float weight;
    private String type;

    public UUID getId() { return id; }

    public void setId(UUID id) { this.id = id; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public float getWeight() { return weight; }

    public void setWeight(float weight) { this.weight = weight; }

    public String getType() { return type; }

    public void setType(String type) { this.type = type; }

    @Override
    public Criteria fromResultSet(ResultSet rs, int rowNum) throws SQLException {
        Criteria c = new Criteria();
        c.setId(UUID.fromString(rs.getString("id")));
        c.setName(rs.getString("name"));
        c.setWeight(rs.getFloat("weight"));
        c.setType(rs.getString("criterion_type"));
        c.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        return c;
    }

    @Override
    public Criteria fromParams(Params params) {
        Criteria c = new Criteria();
        c.setName(params.name());
        c.setType(params.type());
        return c;
    }

}
