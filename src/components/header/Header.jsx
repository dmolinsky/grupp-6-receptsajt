import '../../index.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header text-center">
            <h1>
                <Link to="/" className="title-link">
                    Julreceptsajten
                </Link>
            </h1>
        </header> 
    );
}

export default Header;
