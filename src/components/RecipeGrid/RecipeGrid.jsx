// import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecipes } from '../../hooks/useRecipes';
import RecipeCard from '../RecipeCard/RecipeCard';
import { ErrorMessage } from '../common/ErrorMessage';

function RecipeGrid({ recipes, searchQuery }) {
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        const searchTerm = (searchQuery || '').trim().toLowerCase();
        setFilteredRecipes(
            recipes.filter((r) => r.title.toLowerCase().includes(searchTerm))
        );
    }, [recipes, searchQuery]);

    if (searchQuery && filteredRecipes.length === 0) {
        return <p>Inga recept matchar din sökning.</p>;
    }

    return (
        <div className="recipe-grid">
            {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}

export function RecipeGridContainer({ category, searchQuery }) {
    const { recipes, loading, error } = useRecipes(category);

    if (loading) return <p>Laddar recept</p>;
    if (error)
        return <ErrorMessage title="Kunde inte hämta recept" error={error} />;
    if (!recipes || recipes.length === 0)
        return <Navigate to="/not-found" replace />;

    return <RecipeGrid recipes={recipes} searchQuery={searchQuery} />;
}

export default RecipeGrid;
