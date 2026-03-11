package com.openpaw.votify.factory;

import com.openpaw.votify.model.Project;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FactoryConfig {

    @Bean
    public Factory<Project, Project.Params> projectFactory() {
        return new Factory<>(Project::new);
    }

    // Add a new bean here for each class that implements Creatable
}