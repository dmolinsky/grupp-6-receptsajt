import { useEffect, useState } from 'react';
import { getRecipeById } from '../utils/getRecipeById';
import {
    mapApiIngredients,
    mapApiInstructions,
    mapApiRecipe,
} from '../utils/recipeMappers';

export const useRecipe = (recipeId) => {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getRecipeById(recipeId)
            .then((data) =>
                setRecipe({
                    ...mapApiRecipe(data),
                    ingredients: mapApiIngredients(data.ingredients),
                    instructions: mapApiInstructions(data.instructions),
                })
            )
            .catch((err) => {
                console.error(err);
                setError(err);
            })
            .finally(() => setLoading(false));

        return () => {
            setRecipe(null);
            setLoading(false);
            setError(null);
        };
    }, [recipeId]);

    return { recipe, loading, error };
};
