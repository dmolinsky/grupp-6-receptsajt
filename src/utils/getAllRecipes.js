const url = 'https://grupp6-rbwot.reky.se/recipes';

export async function getAllRecipes() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching all recipes:', error);
        throw error;
    }
}
