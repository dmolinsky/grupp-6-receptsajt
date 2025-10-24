import { NavLink } from 'react-router-dom';

function CategoryList() {
    const categories = [
        { name: 'kalla rätter', count: 3 },
        { name: 'söta rätter', count: 3 },
        { name: 'varma rätter', count: 3 },
    ];

    return (
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
    );
}

export default CategoryList;
