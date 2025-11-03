import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentList({ comments }) {
    if (!comments || comments.length === 0) {
        return (
            <p className="comment-empty">
                Inga kommentarer än. Bli gärna den första!
            </p>
        );
    }

    return (
        <ul className="comment-list">
            {comments.map((c) => (
                <CommentItem key={c.id || `${c.name}-${c.date}`} comment={c} />
            ))}
        </ul>
    );
}

CommentList.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            name: PropTypes.string.isRequired,
            text: PropTypes.string,
            date: PropTypes.string,
        })
    ).isRequired,
};

export default CommentList;
