import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';
import logo from '../../assets/logo_colorAdjust2.png';

function Header() {
    const navigate = useNavigate();

    const handleTitleClick = (e) => {
        e.preventDefault();
        navigate('/', { state: { clearSearch: true } });
    };

    return (
        <header className="header text-center">
            <h1 className="header-title">
                <Link to="/" onClick={handleTitleClick} className="title-link">
                    <img src={logo} className="site-logo" />
                    <span className="logo-text">Julen's Godaste Recept</span>
                    <img src={logo} className="site-logo-right" />
                </Link>
            </h1>
        </header>
    );
}

export default Header;
