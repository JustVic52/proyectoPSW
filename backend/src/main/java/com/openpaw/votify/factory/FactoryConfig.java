package com.openpaw.votify.factory;

import com.openpaw.votify.model.Criterion;
import com.openpaw.votify.model.Project;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FactoryConfig {

    // Add a new bean here for each class that implements Creatable

    @Bean
    public ProjectFactory projectFactory() {
        return new Factory<>(Project::new);
    }

    @Bean
    public CriterionFactory criterionFactory() { return new Factory<>(Criterion::new); }
}