package com.openpaw.votify.factory;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface Creatable<T, P> {
    T fromResultSet(ResultSet rs, int rowNum) throws SQLException;
    T fromParams(P params);
}
