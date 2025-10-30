import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <main className="not-found">
            <h1>404 – Page not found</h1>
            <img
                src="tomte_letar.png"
                alt="Santa's helper is looking for a page"
            />
            <p>
                The page you are looking for does not exist or has been moved.
            </p>
            <Link to="/" className="btn">
                Back to homepage
            </Link>
        </main>
    );
}

export default NotFoundPage;
