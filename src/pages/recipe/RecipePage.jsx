import { useParams } from 'react-router-dom';
import Recipe from '../../components/Recipe/Recipe';

function RecipePage() {
    const { recipeId } = useParams();

    return (
        <main className="recipe-page">
            <Recipe category={recipeId} />
        </main>
    );
}

export default RecipePage;
