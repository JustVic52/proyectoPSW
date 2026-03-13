package com.openpaw.votify.factory;

import com.openpaw.votify.model.Criterion;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class CriterionFactory implements EntityFactory<Criterion, Criterion.Params> {

    @Override
    public Criterion fromResultSet(ResultSet rs, int rowNum) throws SQLException {
        return null;
    }

    @Override
    public Criterion fromParams(Criterion.Params params) {
        return null;
    }
}
