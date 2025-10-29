import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../utils/getRecipeById';
import {
    mapApiIngredients,
    mapApiInstructions,
    mapApiRecipe,
} from '../../utils/recipeMappers';
import DifficultyBadge from '../DifficultyBadge/DifficultyBadge';

import StarRating from 'src/components/starRating/StarRating.jsx';

function Recipe() {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const data = await getRecipeById(recipeId);

                const mappedRecipe = {
                    ...mapApiRecipe(data),
                    ingredients: mapApiIngredients(data.ingredients),
                    instructions: mapApiInstructions(data.instructions),
                };

                setRecipe(mappedRecipe);
            } catch (err) {
                console.error(err);
                setError('Kunde inte hämta receptet 😞');
            } finally {
                setLoading(false);
            }
        }

        fetchRecipe();
    }, [recipeId]);

    if (loading) return <p>Laddar recept...</p>;
    if (error) return <p>{error}</p>;
    if (!recipe) return <p>Receptet kunde inte hittas. 😞</p>;

    const {
        title,
        description,
        image,
        cookingTime,
        ingredientsCount,
        // rating,
        ingredients,
        instructions,
        difficulty,
    } = recipe;

    console.log(image);

    return (
        <article className="recipe-page-grid">
            {/* Details */}
            <div className="recipe-details">
                <div className="recipe-title-row">
                    <h2 className="recipe-title">{title}</h2>
                    <DifficultyBadge level={difficulty} />
                </div>
                <div className="recipe-rating">
                    <StarRating rating={recipe.rating} />
                </div>
                <p className="recipe-meta">
                    {ingredientsCount} ingredienser · {cookingTime}
                </p>
                <p className="recipe-description">{description}</p>
            </div>

            {/* Image */}
            <img src={image} alt={title} className="recipe-img" />

            {/* Ingredients */}
            <div className="recipe-ingredients">
                <h3>Ingredienser:</h3>
                <table>
                    <tbody>
                        {ingredients?.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <span>
                                        {item.amount} {item.unit}
                                    </span>
                                </td>
                                <td>
                                    <span>{item.name}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Instructions */}
            <section className="recipe-instructions">
                <h3>Gör såhär:</h3>
                <ol>
                    {instructions.map((item, i) => (
                        <li key={i} className="round-md">
                            <span>{item}</span>
                        </li>
                    ))}
                </ol>
            </section>
        </article>
    );
}
export default Recipe;
