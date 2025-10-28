const url = 'https://grupp6-rbwot.reky.se/recipes';

// såhär ser scemat ut i API, får testa olika för att få in tid
// const exampleSchema = {
//     "comment": "string",
//     "name": "string"
// };

export async function postCommentById(commentData, recipeId) {
    try {
        const response = await fetch(`${url}/${recipeId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify(commentData),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorData}`);
        }
    } catch (error) {
        console.error('Error posting comment:', error);
        throw error;
    }
}

export default postCommentById;
