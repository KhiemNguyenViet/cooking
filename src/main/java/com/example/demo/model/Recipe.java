package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Entity
@Table(name = "recipes")
@Data
public class Recipe {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;

	@Column(length = 500)
	private String shortDescription;

	private String type;

	private String imageUrl;

	@Column(columnDefinition = "TEXT")
	private String ingredients;

	@Column(columnDefinition = "JSON")
	private String steps; // ← Quan trọng: phải là String, không phải JsonNode

	// Helper để frontend dễ parse (tùy chọn)
	@Transient // Không lưu vào DB
	private JsonNode stepsJson;

	@PostLoad
	private void parseSteps() {
		if (steps != null) {
			try {
				ObjectMapper mapper = new ObjectMapper();
				this.stepsJson = mapper.readTree(steps);
			} catch (Exception e) {
				this.stepsJson = null;
			}
		}
	}
}