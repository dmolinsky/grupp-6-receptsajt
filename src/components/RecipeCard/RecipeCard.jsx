import { Link } from 'react-router-dom';
import DifficultyBadge from '../DifficultyBadge/DifficultyBadge';

function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card round-md">
            <div className="recipe-card-image-wrapper">
                <Link to={`/recipe/${recipe.id}`}>
                    <img
                        className="recipe-card-img"
                        src={recipe.image}
                        alt={recipe.title}
                    />
                </Link>

                <DifficultyBadge level={recipe.difficulty} />
            </div>

            <Link to={`/recipe/${recipe.id}`}>
                <h3 className="recipe-card-title">{recipe.title}</h3>
            </Link>
            <div className="recipe-card-rating">
                <p>★★★★☆</p>
            </div>
            <p className="recipe-card-description">
                {recipe.description.length > 100
                    ? recipe.description.substring(0, 100) + '...'
                    : recipe.description}
            </p>
            <div className="recipe-card-details">
                <span>{recipe.ingredientsCount} ingredienser</span>
                <span>{recipe.cookingTime} minuter</span>
            </div>
        </div>
    );
}

export default RecipeCard;
