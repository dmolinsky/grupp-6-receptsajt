import StarRating from '../../components/starRating/StarRating.jsx';
import DifficultyBadge from '../DifficultyBadge/DifficultyBadge';

function Recipe({ recipe }) {
    if (!recipe) return null;

    const {
        title,
        description,
        image,
        cookingTime,
        ingredientsCount,
        rating,
        ingredients,
        instructions,
        difficulty,
    } = recipe;

    return (
        <article className="recipe-page-grid">
            {/* Details */}
            <div className="recipe-details">
                <div className="recipe-title-row">
                    <h2 className="recipe-title">{title}</h2>
                    <DifficultyBadge level={difficulty} />
                </div>
                <div className="recipe-rating">
                    <StarRating rating={rating} />
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
                            <tr key={item.name}>
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
                <h3>Gör så här:</h3>
                <ol>
                    {instructions.map((item, i) => (
                        <li key={`${item}-${i}`} className="round-md">
                            <span>{item}</span>
                        </li>
                    ))}
                </ol>
            </section>
        </article>
    );
}

export default Recipe;
