import PropTypes from 'prop-types';

function CommentItem({ comment }) {
    const { name, comment: text, date: createdAt } = comment;
    const formattedDate = new Date(createdAt).toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    return (
        <li className="comment-item">
            <header className="comment-item__header">
                <strong className="comment-item__author">
                    <p>{name}</p>
                </strong>
                <time className="comment-item__date" dateTime={createdAt}>
                    {formattedDate}
                </time>
            </header>
            <p className="comment-item__text">{text}</p>
        </li>
    );
}

CommentItem.propTypes = {
    comment: PropTypes.shape({
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
};

export default CommentItem;
