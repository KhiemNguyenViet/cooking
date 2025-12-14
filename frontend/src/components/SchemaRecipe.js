import React from 'react';
import { Helmet } from 'react-helmet';
import API_URL from '../config';

function SchemaRecipe({ recipe }) {
  if (!recipe) return null;
  const imageFull = recipe.imageUrl ? (recipe.imageUrl.startsWith('http') ? recipe.imageUrl : `${API_URL}${recipe.imageUrl}`) : undefined;
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.shortDescription,
    image: imageFull,
    recipeIngredient: recipe.ingredients ? recipe.ingredients.split('\n').map(s => s.trim()).filter(Boolean) : [],
    recipeInstructions: recipe.steps ? JSON.parse(recipe.steps).map(s => ({ '@type': 'HowToStep', text: s.description })) : [],
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export default SchemaRecipe;
