import CommentSection from 'src/components/comment/CommentSection.jsx';

function RecipePage() {
    return (
        <main>
            <p>Recipe page</p>
            <CommentSection recipeId="demo" initialComments={[]} />
        </main>
    );
}

export default RecipePage;
