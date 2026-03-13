package com.openpaw.votify.factory;

import com.openpaw.votify.model.Criterion;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Component
public class CriterionFactory implements EntityFactory<Criterion, Criterion.Params> {

    @Override
    public Criterion fromResultSet(ResultSet rs, int rowNum) throws SQLException {
        Criterion c = new Criterion();
        c.setId(UUID.fromString(rs.getString("id")));
        c.setName(rs.getString("name"));
        c.setWeight(rs.getFloat("weight"));
        c.setType(c.convertCriterionType(rs.getString("criterion_type")));
        c.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        c.setScaleID(UUID.fromString(rs.getString("scale_id")));
        return c;
    }

    @Override
    public Criterion fromParams(Criterion.Params params) {
        Criterion c = new Criterion();
        c.setName(params.name());
        c.setType(params.type());
        c.setWeight(params.weight());
        return c;
    }
}
