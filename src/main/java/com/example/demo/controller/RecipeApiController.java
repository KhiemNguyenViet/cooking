package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Recipe;
import com.example.demo.repository.RecipeRepository;
import java.util.List;

@RestController
@RequestMapping("/api/recipes")

public class RecipeApiController {

	@Autowired
	private RecipeRepository recipeRepository;

	@GetMapping
	public List<Recipe> getAllRecipes() {
		return recipeRepository.findAll();
	}

	@PostMapping
	public Recipe createRecipe(@RequestBody Recipe recipe) {
		return recipeRepository.save(recipe);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
		return recipeRepository.findById(id)
				.map(recipe -> ResponseEntity.ok(recipe))
				.orElse(ResponseEntity.notFound().build());
	}

}
