import { useCallback, useEffect, useState } from 'react';
import { getAllRecipes } from '../utils/getAllRecipes';
import { getRecipesByCategory } from '../utils/getRecipesByCategory';
import { mapApiRecipes } from '../utils/recipeMappers';

export const useCategory = ({ category, searchQuery }) => {
    const [data, setData] = useState([]);
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
            .then((data) => setData(mapApiRecipes(data)))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));

        return () => {
            setData([]);
            setLoading(false);
            setError(null);
        };
    }, [category, getRecipes]);

    useEffect(() => {
        setLoading(true);

        if (searchQuery) {
            const searchTerm = (searchQuery || '').trim().toLowerCase();
            setRecipes(
                data.filter((r) => r.title.toLowerCase().includes(searchTerm))
            );
        } else {
            setRecipes(data);
        }

        setLoading(false);

        return () => {
            setRecipes([]);
            setLoading(false);
        };
    }, [data, searchQuery]);

    return { recipes, loading, error };
};
