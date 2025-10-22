import React from 'react';

function CommentItem({ comment }) {
    const { name, text, createdAt } = comment;
    const formattedDate = new Date(createdAt).toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    return (
        <li className="comment-item">
            <header className="comment-item__header">
                <strong className="comment-item__author">{name}</strong>
                <time className="comment-item__date" dateTime={createdAt}>
                    {formattedDate}
                </time>
            </header>
            <p className="comment-item__text">{text}</p>
        </li>
    );
}

export default CommentItem;
