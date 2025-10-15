import RecipeCard from '../RecipeCard/RecipeCard';
import React, { useEffect, useState } from 'react';
import { getAllRecipes } from '../../utils/getAllRecipes';
import { getRecipesByCategory } from '../../utils/getRecipesByCategory';
import { mapApiRecipes } from '../../utils/recipeMappers';

function RecipeGrid({ category = null, searchQuery = null }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRecipes() {
            try {
                let data;

                if (category) {
                    data = await getRecipesByCategory(category);
                } else if (searchQuery) {
                    // OBS PLACEHOLDER!!
                    data = await getAllRecipes(); // ska bytas till getRecipesBySearch(searchQuery) eller liknande
                } else {
                    data = await getAllRecipes();
                }

                const mapped = mapApiRecipes(data);
                setRecipes(mapped);
            } catch (err) {
                setError('Kunde inte hämta recept 😞');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchRecipes();
    }, [category, searchQuery]);
    if (loading) return <p>Laddar recept, vänta lite!</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="recipe-grid">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}

export default RecipeGrid;
<<<<<<< HEAD
	
=======
>>>>>>> 72973dd (EDIT formatted by Prettier)
