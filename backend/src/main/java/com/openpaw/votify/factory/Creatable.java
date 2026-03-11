package com.openpaw.votify.factory;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * To integrate a class with the Factory system:
 * - Implement this interface with the class itself as T and its Params record as P.
 * - Register a bean in FactoryConfig using Factory<YourClass, YourClass.Params>.
 */
public interface Creatable<T, P> {
    T fromResultSet(ResultSet rs, int rowNum) throws SQLException;
    T fromParams(P params);
}
