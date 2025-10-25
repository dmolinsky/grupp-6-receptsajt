import { useParams } from 'react-router-dom';
import Recipe from '../../components/Recipe/Recipe';
import Rating from '../../components/rating/Rating';

import CommentSection from 'src/components/comment/CommentSection.jsx';

function RecipePage() {
    const { recipeId } = useParams();

    return (
        <div className="recipe-page">
            <Recipe recipeId={recipeId} />
            <Rating />
            <CommentSection recipeId={recipeId} />
        </div>
    );
}

export default RecipePage;
