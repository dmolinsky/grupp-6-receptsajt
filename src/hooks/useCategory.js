import { useCallback, useEffect, useState } from 'react';
import { getAllRecipes } from '../utils/getAllRecipes';
import { getRecipesByCategory } from '../utils/getRecipesByCategory';
import { mapApiRecipes } from '../utils/recipeMappers';

export const useCategory = (category) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getRecipes = useCallback(async () => {
        if (category) return getRecipesByCategory(category);
        return getAllRecipes();
    }, [category]);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getRecipes()
            .then((data) => setRecipes(mapApiRecipes(data)))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));

        return () => {
            setRecipes([]);
            setLoading(false);
            setError(null);
        };
    }, [category, getRecipes]);

    return { recipes, loading, error };
};
