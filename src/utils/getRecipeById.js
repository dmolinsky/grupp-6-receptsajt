const url = 'https://grupp6-rbwot.reky.se/recipes/';

export async function getRecipeById(id) {
    try {
        const response = await fetch(`${url}${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('Error fetching recipe by ID:', error);
        throw error;
    }
}
