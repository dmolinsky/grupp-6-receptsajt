import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import postCommentById from '../../utils/postCommentById';
import getCommentsById from '../../utils/getCommentsById';
import mapApiComment from '../../utils/commentMapper';

function CommentSection({ recipeId }) {
    const [comments, setComments] = useState([]);
    const [flash, setFlash] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchComments() {
            try {
                const data = await getCommentsById(recipeId);
                const mapped = mapApiComment(data);

                setComments(mapped);
            } catch (err) {
                console.error('Kunde inte hämta kommentarer:', err);
                setError('Kunde inte hämta kommentarer. 😞');
            }
        }

        fetchComments();
    }, [recipeId]);

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
                comment: commentData.text,
                name: commentData.name,
                date: new Date().toISOString(),
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
                <p className="comment-form__flash">
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

CommentSection.propTypes = {
    recipeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};

export default CommentSection;
