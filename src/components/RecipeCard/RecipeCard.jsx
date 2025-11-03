import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { useState, useEffect } from 'react';
import StarRating from './StarRating';
=======
import DifficultyBadge from '../DifficultyBadge/DifficultyBadge';

import StarRating from 'src/components/starRating/StarRating.jsx';
>>>>>>> origin/dev

function RecipeCard({ recipe }) {
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
    
        const ratings = recipe.ratings || [4, 5, 3, 4];

        if (ratings.length > 0) {
            const sum = ratings.reduce((a, b) => a + b, 0);
            const average = Math.round(sum / ratings.length);
            setAverageRating(average);
        } else {
            setAverageRating(0);
        }
    }, [recipe]);
    
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
<<<<<<< HEAD
                <StarRating rating={averageRating} />
            
            </div>  
=======
                <StarRating rating={recipe.rating} />
            </div>
>>>>>>> origin/dev
            <p className="recipe-card-description">
                {recipe.description.length > 100
                    ? recipe.description.substring(0, 100) + '...'
                    : recipe.description}
            </p>
            <div className="recipe-card-details">
                <span>{recipe.ingredientsCount} ingredienser</span>
                <span>{recipe.cookingTime}</span>
            </div>
        </div>
    );
}

export default RecipeCard;

