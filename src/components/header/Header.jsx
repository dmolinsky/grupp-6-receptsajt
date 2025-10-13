import '../../Index.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header text-center">
            <h1>Julreceptsajten</h1>
            <nav className="nav">
                <Link to="/" className="button">
                    Hem
                </Link>
                <Link to="/category/:categoryId" className="button">
                    Kategorier
                </Link>
                <Link to="/recipe/:recipeId" className="button">
                    Recept
                </Link>
            </nav>
        </header>
    );
}

export default Header;
