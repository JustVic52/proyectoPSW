package com.openpaw.votify.factory;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * To integrate a class with the Factory system:
 * - Create a class implementing this interface (e.g. ProjectFactory).
 * - Annotate it with @Component so Spring auto-registers it as a bean.
 * - This avoids tying generic type parameters to the model class, allowing free inheritance.
 */
public interface EntityFactory<T, P> {
    T fromResultSet(ResultSet rs, int rowNum) throws SQLException;
    T fromParams(P params);
}
