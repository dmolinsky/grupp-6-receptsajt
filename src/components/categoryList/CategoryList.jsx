import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function CategoryList() {
    const [showMenu, setShowMenu] = useState(false);

    const categories = [
        { name: 'kalla rätter', count: 3 },
        { name: 'söta rätter', count: 3 },
        { name: 'varma rätter', count: 3 },
    ];

    return (
        <>
            <div className="category-list">
                <h3>Kategorier:</h3>
                {categories.map((category, index) => (
                    <div className="category-link">
                        <NavLink to={`/category/${category.name}`}>
                            <span key={index}>
                                {category.name.charAt(0).toUpperCase() +
                                    category.name.slice(1)}{' '}
                                ({category.count})
                            </span>
                        </NavLink>
                    </div>
                ))}
            </div>

            <div className="category-list-small-screens">
                <button
                    className="category-toggle"
                    onClick={() => setShowMenu(!showMenu)}
                    aria-expanded={showMenu}
                >
                    <span className="category-toggle-text">Kategorier</span>
                    <span className={`arrow ${open ? 'up' : 'down'}`}>▾</span>
                </button>

                <div className={`dropdown ${showMenu ? 'show' : ''}`}>
                    {categories.map((category, index) => (
                        <NavLink
                            key={index}
                            to={`/category/${category.name}`}
                            onClick={() => setShowMenu(false)}
                        >
                            <p>
                                {category.name.charAt(0).toUpperCase() +
                                    category.name.slice(1)}{' '}
                                ({category.count})
                            </p>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CategoryList;
