package com.openpaw.votify.factory;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

public interface FactoryItem<T, P> {
    T create(ResultSet rs, int rowNum) throws SQLException;
    T create(P params);
}
