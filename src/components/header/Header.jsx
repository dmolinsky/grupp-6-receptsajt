import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';

function Header() {
    const navigate = useNavigate();

    const handleTitleClick = (e) => {
        e.preventDefault();
        navigate('/', { state: { clearSearch: true } });
    };

    return (
        <header className="header text-center">
            <h1>
                <Link to="/" onClick={handleTitleClick} className="title-link">
                    Julreceptsajten
                </Link>
            </h1>
        </header>
    );
}

export default Header;
