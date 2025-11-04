function StarRating({ rating }) {
    const stars = Array.from({ length: 5 }, (_, i) => (
        <span
            key={i}
            style={{
                color: i < rating ? '#FFD700' : '#ccc',
                fontSize: '20px',
                marginRight: '2px',
            }}
        >
            {i < rating ? '★' : '☆'}
        </span>
    ));
    return <div>{stars}</div>;
}
