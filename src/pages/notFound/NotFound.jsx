import { Link } from 'react-router-dom';
import CategoryList from '../../components/categoryList/CategoryList';

function NotFoundPage() {
    return (
        <main className="not-found">
            <CategoryList />
            <h2>404 – Page not found</h2>
            <img
                src="/tomte_letar.png"
                alt="Santa's helper is looking for a page"
            />
            <p>
                The page you are looking for does not exist or has been moved.
            </p>
            <Link to="/" className="btn">
                <span>Back to homepage</span>
            </Link>
        </main>
    );
}

export default NotFoundPage;
