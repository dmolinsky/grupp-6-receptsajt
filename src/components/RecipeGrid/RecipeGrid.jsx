// import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecipes } from '../../hooks/useRecipes';
import RecipeCard from '../RecipeCard/RecipeCard';
import { ErrorMessage } from '../common/ErrorMessage';

function RecipeGrid({ recipes }) {
    return (
        <div className="recipe-grid">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}

export function RecipeGridContainer({ category, searchQuery }) {
    const { recipes, loading, error } = useRecipes(category);
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        const searchTerm = (searchQuery || '').trim().toLowerCase();
        setFilteredRecipes(
            recipes.filter((r) => r.title.toLowerCase().includes(searchTerm))
        );
    }, [recipes, searchQuery]);

    if (loading) return <p>Laddar recept</p>;
    if (error) {
        const title = category
            ? `Kunde inte hämta recepten i kategorin "${category}"`
            : 'Kunde inte hämta recept';

        return (
            <ErrorMessage
                title={title}
                error="Ett fel uppstod när recepten skulle hämtas. Försök igen senare."
            />
        );
    }

    if (!recipes || recipes.length === 0) {
        return (
            <div className="empty-state">
                <h2>Inga recept!</h2>
                <p>
                    {category
                        ? `Det finns inga recept i kategorin "${category}" just nu.`
                        : 'Det finns inga recept att visa ännu.'}
                </p>
            </div>
        );
    }

    if (searchQuery && filteredRecipes.length === 0) {
        return <p>Inga recept matchar din sökning.</p>;
    }

    return <RecipeGrid recipes={filteredRecipes} />;
}

export default RecipeGrid;
