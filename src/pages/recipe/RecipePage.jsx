import { useParams } from 'react-router-dom';
import Recipe from '../../components/Recipe/Recipe';
import Rating from '../../components/rating/Rating';

function RecipePage() {
    const { recipeId } = useParams();

    return (
        <div className="recipe-page">
            <Recipe recipeId={recipeId} />
            <Rating />
        </div>
    );
}

export default RecipePage;
