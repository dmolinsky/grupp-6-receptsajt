// import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecipes } from '../../hooks/useRecipes';
import RecipeCard from '../RecipeCard/RecipeCard';

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
    if (error) return <p>{error.message}</p>;
    if (!recipes || recipes.length === 0)
        return <Navigate to="/not-found" replace />;

    if (searchQuery && filteredRecipes.length === 0) {
        return <p>Inga recept matchar din sökning.</p>;
    }

    return <RecipeGrid recipes={filteredRecipes} />;
}

export default RecipeGrid;
