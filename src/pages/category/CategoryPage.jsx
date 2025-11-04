import CategoryList from '../../components/categoryList/CategoryList';
import { RecipeGridContainer } from '../../components/RecipeGrid/RecipeGrid';
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getAllCategories } from '../../utils/getAllCategories';

function CategoryPage() {
    const { categoryName } = useParams();
    const [validCategory, setValidCategory] = useState(null);

    useEffect(() => {
        async function checkCategory() {
            try {
                const categories = await getAllCategories();
                const exists = categories.some(
                    (c) => c.name.toLowerCase() === categoryName.toLowerCase()
                );

                setValidCategory(exists);
            } catch {
                setValidCategory(false);
            }
        }
        checkCategory();
    }, [categoryName]);

    if (validCategory === null) {
        return <p>Laddar kategori...</p>;
    }

    if (!validCategory) return <Navigate to="/not-found" replace />;

    return (
        <main>
            <CategoryList />
            <RecipeGridContainer category={categoryName} />
        </main>
    );
}

export default CategoryPage;
