import { useParams } from 'react-router-dom';
import CommentSection from '../../components/comment/CommentSection.jsx';
import { ErrorMessage } from '../../components/common/ErrorMessage.jsx';
import Rating from '../../components/rating/Rating';
import Recipe from '../../components/Recipe/Recipe';
import { useRecipe } from '../../hooks/useRecipe';
import NotFound from '../notFound/NotFound';

function RecipePage() {
    const { recipeId } = useParams();
    const { recipe, loading, error } = useRecipe(recipeId);

    if (loading) return <p>Laddar recept</p>;
    if (error)
        return <ErrorMessage title="Kunde inte hämta receptet" error={error} />;
    if (!recipe) return <NotFound />;

    return (
        <div className="recipe-page">
            <Recipe recipe={recipe} />
            <Rating />
            <CommentSection recipeId={recipeId} />
        </div>
    );
}

export default RecipePage;
