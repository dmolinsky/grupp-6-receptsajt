import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import postRating from '../../utils/postRating';
import { setRatedRecipe, hasRated } from '../../utils/localStorage';

const Rating = () => {
    const { recipeId } = useParams();

    const [rating, setRating] = useState(0);
    const [alreadyRated, setAlreadyRated] = useState(false);

    useEffect(() => {
        if (hasRated(recipeId)) {
            setAlreadyRated(true);
        }
    }, [recipeId]);

    const handleClick = (value) => {
        setRating(value);
        console.log(value);
        console.log(recipeId);
    };

    const handleSend = () => {
        postRating(rating, recipeId);
        setRatedRecipe(recipeId, true);
        setAlreadyRated(true);
    };

    if (alreadyRated) {
        return (
            <div className="ratingContainer">
                <p className="ratingMessage">
                    Tack för din röst! <br />
                    Du har betygsatt detta recept.
                </p>
            </div>
        );
    }

    return (
        <div className="ratingContainer">
            <h2 className="ratingHeader">Vad tyckte du om receptet?</h2>
            <div className="ratingStars">
                {[1, 2, 3, 4, 5].map((value) => (
                    <button
                        key={value}
                        className={`ratingButton${rating === value ? ' ratingButton--selected' : ''}`}
                        onClick={() => handleClick(value)}
                    >
                        {value} {rating === value ? '★' : '☆'}
                    </button>
                ))}
            </div>
            <button
                className="ratingSend"
                onClick={handleSend}
                disabled={rating === 0}
            >
                Skicka
            </button>
        </div>
    );
};

export default Rating;
