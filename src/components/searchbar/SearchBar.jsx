import { useState } from 'react';

function SearchBar({ defaultValue = '', onSearch }) {
    const [value, setValue] = useState(defaultValue);
    const [error, setError] = useState('');

    const validate = (raw) => {
        const v = raw.trim();
        if (v.length === 0) return 'Sökfältet kan inte vara tomt.';
        if (v.length < 2) return 'Minst 2 tecken krävs.';
        if (v.length > 100) return 'För långt sökord (max 100 tecken).';
        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const msg = validate(value);
        setError(msg);
        if (!msg) onSearch?.(value.trim());
    };

    const handleClear = () => {
        setValue('');
        setError('');
        onSearch?.('');
    };

    return (
        <form className="searchbar" noValidate onSubmit={handleSubmit}>
            <div className="searchbar__control">
                <span className="searchbar__icon" aria-hidden="true">
                    🔍
                </span>

                <input
                    type="search"
                    className="searchbar__field"
                    placeholder="Sök bland dina favoritrecept"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby="search-error"
                />

                {value && (
                    <button
                        type="button"
                        className="searchbar__clear"
                        onClick={handleClear}
                        aria-label="Rensa sökfält"
                        title="Rensa"
                    >
                        x
                    </button>
                )}
            </div>

            <div
                id="searchbar-error"
                className="searchbar__error"
                role={error ? 'alert' : undefined}
            >
                {error}
            </div>
        </form>
    );
}

export default SearchBar;
