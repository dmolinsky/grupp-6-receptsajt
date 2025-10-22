import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StarRating from './StarRating';

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
            <Link to={`/recipe/${recipe.id}`}>
                <img
                    className="recipe-card-img"
                    src="https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/mpyhqrwdrvmxe4kdeklo.jpg"
                    alt={recipe.title}
                />
            </Link>
            <Link to={`/recipe/${recipe.id}`}>
                <h3 className="recipe-card-title">{recipe.title}</h3>
            </Link>
            <div className="recipe-card-rating">
                <StarRating rating={averageRating} />
            
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

