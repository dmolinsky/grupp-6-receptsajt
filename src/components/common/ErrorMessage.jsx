import { Link } from 'react-router-dom';

export function ErrorMessage({ title, error }) {
    const errorText =
        typeof error === 'string'
            ? error
            : error?.message || 'Ett oväntat fel uppstod.';

    return (
        <div className="not-found">
            <h2>{title ?? 'Något gick fel.'}</h2>
            <img
                src="../tomte_letar.png"
                alt="Santa's helper is looking for a page"
            />
            <p>{errorText}</p>
            <Link to="/" className="btn">
                <span>Till startsidan</span>
            </Link>
        </div>
    );
}
