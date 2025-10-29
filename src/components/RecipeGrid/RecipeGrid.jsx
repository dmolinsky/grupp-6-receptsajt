import { useEffect, useState } from 'react';
import { getAllRecipes } from '../../utils/getAllRecipes';
import { getRecipesByCategory } from '../../utils/getRecipesByCategory';
import { mapApiRecipes } from '../../utils/recipeMappers';
import RecipeCard from '../RecipeCard/RecipeCard';

function RecipeGrid({ category = null, searchQuery = '' }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchRecipes() {
            try {
                setLoading(true);
                setError(null);

                const data = category
                    ? await getRecipesByCategory(category)
                    : await getAllRecipes();

                const mapped = mapApiRecipes(data);
                if (!cancelled) setRecipes(mapped);
            } catch (err) {
                if (!cancelled) setError('Kunde inte hämta recept 😞');
                console.error(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchRecipes();
        return () => {
            cancelled = true;
        };
    }, [category]);

    if (loading) return <p>Laddar recept, vänta lite!</p>;
    if (error) return <p>{error}</p>;

    const searchTerm = (searchQuery || '').trim().toLowerCase();
    const visibleRecipes = !searchTerm
        ? recipes
        : recipes.filter((r) => r.title.toLowerCase().includes(searchTerm));

    return (
        <div className="recipe-grid">
            {visibleRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}

            {searchTerm && visibleRecipes.length === 0 && (
                <p className="recipe-grid__empty">Inga recept matchar din sökning.</p>
            )}
        </div>
    );
}

export default RecipeGrid;
