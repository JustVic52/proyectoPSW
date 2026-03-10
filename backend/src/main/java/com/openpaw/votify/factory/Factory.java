package com.openpaw.votify.factory;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.function.Supplier;

public class Factory<T extends FactoryItem<T, P>, P> {
    private final Supplier<T> supplier;

    public Factory(Supplier<T> supplier) {
        this.supplier = supplier;
    }

    public T create(ResultSet rs, int rowNum) throws SQLException {
        return supplier.get().create(rs, rowNum);
    }
}
