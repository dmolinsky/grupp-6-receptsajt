import { useState } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const validate = (value) => {
        const v = value.trim();
        if (v.length === 0) return 'Sökfältet kan inte vara tomt.';
        if (v.length < 2) return 'Minst 2 tecken krävs.';
        if (v.length > 100) return 'För långt sökord (max 100 tecken).';
        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validate(query);
        setError(err);
        if (err) {
            setMessage('');
            return;
        }
        setMessage('Sökte efter: ' + query);
        setQuery('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="field"
            role="search"
            aria-label="Sök recept"
        >
            <input
                className="input"
                type="search"
                placeholder="Sök bland recept..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setError('');
                    setMessage('');
                }}
            />
            {error && (
                <div className="help" style={{ color: '#f87171' }}>
                    {error}
                </div>
            )}
            {message && (
                <div className="help" style={{ color: '#22c55e' }}>
                    {message}
                </div>
            )}
            <button
                className="button"
                type="submit"
                style={{ marginTop: '0.5rem' }}
            >
                Sök
            </button>
        </form>
    );
}

export default SearchBar;
