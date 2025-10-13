const url = 'https://grupp6-rbwot.reky.se/categories/';

export const getRecipesByCategory = async (category) => {
    try {
        const response = await fetch(url + category + '/recipes');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};
