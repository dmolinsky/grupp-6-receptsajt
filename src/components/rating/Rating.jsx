import { useState } from 'react';

import postRating from '../../utils/postRating';

const Rating = () => {
    const [rating, setRating] = useState(0);

    const handleClick = (value) => {
        setRating(value);
        console.log(value);
    };

    return (
        <div>
            <h2>Vad tyckte du om receptet?</h2>
            <div>
                {[1, 2, 3, 4, 5].map((value) => (
                    <button key={value} onClick={() => handleClick(value)}>
                        {value} {rating === value ? '★' : '☆'}
                    </button>
                ))}
            </div>
            <button onClick={() => postRating(rating, recipeId)}>Skicka</button>
        </div>
    );
};

export default Rating;
