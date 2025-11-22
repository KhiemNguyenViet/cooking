package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**") // Áp dụng cho tất cả API
						.allowedOrigins("http://localhost:3000") // Cho phép frontend
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các method
						.allowedHeaders("*") // Tất cả header
						.allowCredentials(true); // Cookie nếu cần
			}
		};
	}
}