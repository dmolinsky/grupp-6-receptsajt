/**
 * Mapping one single recipe from JSON to object
 */
export function mapApiRecipe(apiRecipe) {
    if (!apiRecipe) return null;

    //avgRating — if null, set to 0
    const averageRating =
        apiRecipe.avgRating == null ? 0 : Math.round(apiRecipe.avgRating);

    // Hantera difficulty (saved as price in API). 1 = enkel, 2 = medium, 3 = svår
    // any other value on price is saved as 0
    const difficulty = [1, 2, 3].includes(apiRecipe.price)
        ? apiRecipe.price
        : 0;

    return {
        id: apiRecipe._id,
        title: apiRecipe.title,
        description: apiRecipe.description || '',
        image: apiRecipe.image_url || '',
        category: apiRecipe.category || 'Okänd kategori',
        cookingTime: apiRecipe.cooking_time || 0,
        ingredientsCount: apiRecipe.ingredients_count || 0,
        rating: averageRating,
        difficulty: difficulty,
    };
}

/**
 * Using mapApiRecipe to convert JSON to list of recipe objects
 */
export function mapApiRecipes(apiRecipes) {
    if (!Array.isArray(apiRecipes)) return [];
    return apiRecipes.map(mapApiRecipe).filter((recipe) => recipe !== null);
}
