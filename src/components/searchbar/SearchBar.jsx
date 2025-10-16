import { useState } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');

    const validate = (value) => {
        const v = value.trim();
        if (v.length === 0) return 'Sökfältet kan inte vara tomt.';
        if (v.length < 2) return 'Minst 2 tecken krävs.';
        if (v.length > 100) return 'För långt sökord (max 100 tecken).';
        return '';
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validate(query);
        setError(err);
    };

    const clearAll = () => {
        setQuery('');
        setError('');
    };

    const hasValue = query.trim().length > 0;
    const hasError = !!error;

    return (
        <form
            role="search"
            aria-label="Sök bland recept"
            noValidate
            className={`searchbar ${hasValue ? 'searchbar--has-value' : ''} ${
                hasError ? 'searchbar--error' : ''
            }`}
            onSubmit={handleSubmit}
        >
            <svg
                className="searchbar__icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.71.71l.27.28v.79L20 20.5 20.5 20l-5-6zM10 15.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"
                />
            </svg>

            <input
                type="search"
                className="searchbar__field"
                placeholder="Sök bland dina favoritrecept"
                value={query}
                onChange={handleChange}
                aria-invalid={hasError ? 'true' : 'false'}
            />

            <button
                type="button"
                className="searchbar__clear"
                aria-label="Rensa sökfält"
                onClick={clearAll}
            >
                &#215;
            </button>

            {hasError && (
                <p
                    id="searchbar-error"
                    className="searchbar__error"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </form>
    );
}

export default SearchBar;
