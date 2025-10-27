import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../utils/getAllCategories';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (err) {
                console.error('Kunde inte hämta kategorier:', err);
                setError('Kunde inte hämta kategorier 😞');
            }
        }

        fetchCategories();
    }, []);

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
