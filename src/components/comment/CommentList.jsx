import React from 'react';
import CommentItem from './CommentItem';

function CommentList({ comments }) {
    if (!comments || comments.length === 0) {
        return (
            <p className="comment-empty">
                Inga kommentarer än. Bli den första!
            </p>
        );
    }

    return (
        <ul className="comment-list" role="list">
            {comments.map((c) => (
                <CommentItem key={c._id} comment={c} />
            ))}
        </ul>
    );
}

export default CommentList;
