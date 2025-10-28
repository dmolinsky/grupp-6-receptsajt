import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
import { useParams } from 'react-router-dom';
import CategoryList from '../../components/categoryList/CategoryList';

function CategoryPage() {
    const { categoryId } = useParams();

    return (
        <main>
            <CategoryList />
            <RecipeGrid category={categoryId} />
        </main>
    );
}

export default CategoryPage;
