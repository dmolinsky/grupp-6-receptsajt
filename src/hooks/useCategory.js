import { useCallback, useEffect, useState } from 'react';
import { getAllRecipes } from '../utils/getAllRecipes';
import { getRecipesByCategory } from '../utils/getRecipesByCategory';
import { mapApiRecipes } from '../utils/recipeMappers';

export const useCategory = (category, searchQuery) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getRecipes = useCallback(async () => {
        if (category) return getRecipesByCategory(category);
        if (searchQuery) return getAllRecipes(); // Placeholder for future implementation
        return getAllRecipes();
    }, [category, searchQuery]);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getRecipes()
            .then((data) => setRecipes(mapApiRecipes(data)))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));

        return () => {
            setRecipes(null);
            setLoading(false);
            setError(null);
        };
    }, [category, searchQuery, getRecipes]);

    return { recipes, loading, error };
};
