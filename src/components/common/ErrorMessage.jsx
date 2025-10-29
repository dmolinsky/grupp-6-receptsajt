import { Link } from 'react-router-dom';

export function ErrorMessage({ error }) {
    return (
        <div className="not-found">
            <h1>Something went wrong</h1>
            <p>{error?.message}</p>
            <Link to="/" className="btn">
                Back to homepage
            </Link>
        </div>
    );
}
