package com.devmountain.daekwondo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.devmountain.daekwondo.repositories")
@EntityScan(basePackages = "com.devmountain.daekwondo.entities")
public class DaekwondoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DaekwondoApplication.class, args);
	}

}
