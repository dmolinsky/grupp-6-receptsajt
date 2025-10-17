import { useState } from 'react';

const Rating = () => {
    const [rating, setRating] = useState(0);

    const handleClick = (value) => {
        setRating(value);
        console.log(value);
    };

    const submitRating = () => {
        // placeholder for api call
        console.log(`Submitting rating: ${rating}`);
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
            <button onClick={submitRating}>Skicka</button>
        </div>
    );
};

export default Rating;
