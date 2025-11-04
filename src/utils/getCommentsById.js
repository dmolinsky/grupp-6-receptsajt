const url = 'https://grupp6-rbwot.reky.se/recipes/';

export async function getCommentsById(id) {
    try {
        const response = await fetch(`${url}${id}/comments`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}

export default getCommentsById;
