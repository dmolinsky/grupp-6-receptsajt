import { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import postCommentById from '../../utils/postCommentById';

function CommentSection({ recipeId }) {
    const [comments, setComments] = useState([]);
    const [flash, setFlash] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const exampleComments = [
            {
                name: 'Anna',
                text: 'Supergott recept! Jag la till lite extra kanel.',
                createdAt: '2025-10-24T12:00:00Z',
            },
            {
                name: 'Johan',
                text: 'Smidigt att följa, tack!',
                createdAt: '2025-10-23T18:30:00Z',
            },
        ];

        setComments(exampleComments);
    }, []);

    async function handleAddComment(commentData) {
        setError('');
        setFlash('');

        try {
            await postCommentById(
                {
                    comment: commentData.text,
                    name: commentData.name,
                },
                recipeId
            );

            const newComment = {
                id: crypto.randomUUID(),
                ...commentData,
                createdAt: new Date().toISOString(),
            };

            setComments((prev) => [newComment, ...prev]);
            setFlash('Tack för din kommentar!');
        } catch (err) {
            console.error('Kunde inte spara kommentaren:', err);
            setError('Kunde inte spara kommentaren. :( Försök igen.');
        }
    }

    return (
        <section
            className="comment-section"
            aria-labelledby="comments-title"
            data-recipe-id={recipeId}
        >
            <h2 id="comments-title" className="comment-section__title">
                Kommentarer
            </h2>

            <CommentForm onSubmit={handleAddComment} />
            {flash && (
                <p className="comment-form__flash" role="status">
                    {flash}
                </p>
            )}
            {error && (
                <p className="comment-form__error" role="alert">
                    {error}
                </p>
            )}

            <CommentList comments={comments} />
        </section>
    );
}

export default CommentSection;
