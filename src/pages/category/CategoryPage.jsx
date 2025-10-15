import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
import { useParams } from "react-router-dom";

function CategoryPage() {
    const { categoryId } = useParams();
    
    return (
        <main>
            <p>{categoryId}</p>
            <RecipeGrid category={categoryId}/>
        </main>
    );
}

export default CategoryPage;
