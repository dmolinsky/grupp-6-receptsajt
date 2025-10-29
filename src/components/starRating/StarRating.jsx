function StarRating({ rating }) {
    const stars = Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? '★' : '☆'}</span>
    ));
    return <div className="rating-display">{stars}</div>;
}

export default StarRating;
