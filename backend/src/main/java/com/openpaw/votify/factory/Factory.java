package com.openpaw.votify.factory;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.function.Supplier;

public class Factory<T extends Creatable<T, P>, P> implements Creatable<T, P> {
    private final Supplier<T> supplier;

    public Factory(Supplier<T> supplier) {
        this.supplier = supplier;
    }

    public T fromResultSet(ResultSet rs, int rowNum) throws SQLException {
        return supplier.get().fromResultSet(rs, rowNum);
    }

    @Override
    public T fromParams(P params) {
        return supplier.get().fromParams(params);
    }
}
