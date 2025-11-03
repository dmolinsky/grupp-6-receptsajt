const url = 'https://grupp6-rbwot.reky.se/recipes/';

// test recipe ID
// const testRecipeId = '68e636158a8cd70776c1e6dc';
// const testRating = 4;

export async function postRating(rating, recipeId) {
    try {
        const response = await fetch(`${url}${recipeId}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*', //not sure if needed
            },
            body: JSON.stringify({ rating }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorData}`);
        }
    } catch (error) {
        console.error('Error posting rating:', error);
        throw error;
    }
}

export default postRating;
