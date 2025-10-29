import { useCategory } from '../../hooks/useCategory';
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

export function RecipeGridContainer({ searchQuery }) {
    const { recipes, loading, error } = useCategory({ searchQuery });

    if (loading) return <p>Laddar recept</p>;
    if (error) return <p>{error.message}</p>;
    if (!recipes || recipes.length === 0)
        return <Navigate to="/not-found" replace />;

    return <RecipeGrid recipes={recipes} />;
}

export default RecipeGrid;
