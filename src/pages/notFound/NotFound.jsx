import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <main className="not-found">
            <h1>404 – Page not found</h1>
            <img src="tomte_letar.png" />
            <p>
                The page you are looking for does not exist or has been moved.
            </p>
            <Link to="/" className="btn">
                Back to homepage
            </Link>
            {/* Optional: fun image */}
            {/* <img src="/images/tomte-forstoringsglas.png" alt="Santa's helper is looking for a page" /> */}
        </main>
    );
}

export default NotFoundPage;
