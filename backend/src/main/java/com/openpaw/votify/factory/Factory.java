package com.openpaw.votify.factory;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.function.Supplier;

public class Factory<T extends Creatable<T, P>, P> implements Creatable<T, P> {
    // An instance created once when we create a factory and reused for all subsequent creations
    private final T instance;

    public Factory(Supplier<T> supplier) {
        this.instance = supplier.get();
    }

    public T fromResultSet(ResultSet rs, int rowNum) throws SQLException {
        return instance.fromResultSet(rs, rowNum);
    }

    @Override
    public T fromParams(P params) {
        return instance.fromParams(params);
    }
}
