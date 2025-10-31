import { Link } from 'react-router-dom';

export function ErrorMessage({ title, error }) {
    return (
        <div className="not-found">
            <h1>{title ?? 'Something went wrong'}</h1>
            <p>{error?.message}</p>
            <Link to="/" className="btn">
                Back to homepage
            </Link>
        </div>
    );
}
