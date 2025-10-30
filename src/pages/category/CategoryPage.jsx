import { Navigate, useParams } from 'react-router-dom';
import CategoryList from '../../components/categoryList/CategoryList';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
import { useRecipes } from '../../hooks/useRecipes';

function CategoryPage() {
    const { categoryName } = useParams();
    const { recipes, loading, error } = useRecipes(categoryName);

    if (loading) return <p>Laddar recept</p>;
    if (error)
        return <ErrorMessage title="Kunde inte hämta kategori" error={error} />;
    if (!recipes || recipes.length === 0)
        return <Navigate to="/not-found" replace />;

    return (
        <main>
            <CategoryList />
            <RecipeGrid recipes={recipes} />
        </main>
    );
}

export default CategoryPage;
