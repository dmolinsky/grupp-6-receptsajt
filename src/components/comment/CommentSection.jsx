import React, { useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

function CommentSection({ recipeId, initialComments = [] }) {
    const [comments, setComments] = useState(initialComments);
    const [flash, setFlash] = useState('');

    function handleAddComment(commentData) {
        const newComment = {
            id: crypto.randomUUID(),
            ...commentData,
            createdAt: new Date().toISOString(),
        };
        setComments((prev) => [newComment, ...prev]);
        setFlash('Din kommentar har skickats!');
        setTimeout(() => setFlash(''), 4000);
    }

    return (
        <section className="comment-section" aria-labelledby="comments-title">
            <h2 id="comments-title" className="comment-section__title">
                Kommentarer
            </h2>

            <CommentForm onSubmit={handleAddComment} />
            {flash && (
                <p className="comment-form__flash" role="status">
                    {flash}
                </p>
            )}

            <CommentList comments={comments} />
        </section>
    );
}

export default CommentSection;
