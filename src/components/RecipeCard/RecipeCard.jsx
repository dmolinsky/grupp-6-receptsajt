import { Link } from 'react-router-dom';

function RecipeCard() {
    return (
        <div className="recipe-card round-md">
            <Link to="/recipe/pepparkakor">
                <img
                    className="recipe-card-img"
                    src="https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/mpyhqrwdrvmxe4kdeklo.jpg"
                    alt="Pepparkakor"
                />
            </Link>
            <h3 className="recipe-card-title">Pepparkakor</h3>
            <div className="recipe-card-rating">
                <p>★★★★☆</p>
            </div>
            <p className="recipe-card-description">
                En klassiker under julen och detta receptet ger fantastiskt goda
                kakor med smak av kanel, ...
            </p>
            <div className="recipe-card-details">
                <span>XX Ingredienser</span>
                <span>XX Minuter</span>
            </div>
        </div>
    );
}

export default RecipeCard;
