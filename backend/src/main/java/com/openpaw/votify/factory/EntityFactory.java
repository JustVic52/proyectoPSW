package com.openpaw.votify.factory;

import java.util.Map;

public interface EntityFactory<T> {
    T create(String type, Map<String, Object> values);
}
