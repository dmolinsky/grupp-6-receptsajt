import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card round-md">
            <Link to={`/recipe/${recipe.id}`}>
                <img
                    className="recipe-card-img"
                    src="https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/mpyhqrwdrvmxe4kdeklo.jpg"
                    alt={recipe.title}
                />
            </Link>
            <h3 className="recipe-card-title">{recipe.title}</h3>
            <div className="recipe-card-rating">
                <p>★★★★☆</p>
            </div>
            <p className="recipe-card-description">
                	{recipe.description.length > 100
		            ? recipe.description.substring(0, 100) + "..."
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
