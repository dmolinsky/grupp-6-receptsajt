import '../../index.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header text-center">
            <h1>Julreceptsajten</h1>
            <nav className="nav">
                <Link to="/" className="button">
                    <span>Hem </span>
                </Link>
                <Link to="/category/Frukost" className="button">
                    <span>| Kategori frukost </span>
                </Link>
                <Link to="/recipe/:recipeId" className="button">
                    <span>| Recept </span>
                </Link>
            </nav>
        </header>
    );
}

export default Header;
