/**
 * Mapping one single recipe from JSON to object
 */
export function mapApiRecipe(apiRecipe) {
	if (!apiRecipe) return null;

	return {
		id: apiRecipe.id,
		title: apiRecipe.title,
		description: apiRecipe.description || "",
		image: apiRecipe.image_url || "",
		category: apiRecipe.category || "Okänd kategori",
		cookingTime: apiRecipe.cooking_time || 0,
		ingredientsCount: apiRecipe.ingredients_count || 0,
		rating: apiRecipe.rating || 0,
	};
}

/**
 * Using mapApiRecipe to convert JSON to list of recipe objects
 */
export function mapApiRecipes(apiRecipes) {
	if (!Array.isArray(apiRecipes)) return [];
	return apiRecipes
		.map(mapApiRecipe)
		.filter((recipe) => recipe !== null);
}