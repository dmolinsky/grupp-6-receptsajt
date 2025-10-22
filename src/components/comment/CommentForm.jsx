import React, { useMemo, useState } from 'react';

function CommentForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [touched, setTouched] = useState({ name: false, text: false });

    const MAX = 500;
    const MIN = 2;

    const errors = useMemo(() => {
        const e = {};
        const n = name.trim();
        const t = text.trim();
        if (touched.name && (n.length < MIN || n.length > MAX)) {
            e.name =
                n.length === 0
                    ? 'Namn är obligatoriskt.'
                    : `Mellan ${MIN}-${MAX} tecken.`;
        }
        if (touched.text && (t.length < MIN || t.length > MAX)) {
            e.text =
                t.length === 0
                    ? 'Kommentar är obligatoriskt.'
                    : `Mellan ${MIN}-${MAX} tecken.`;
        }
        return e;
    }, [name, text, touched]);

    const isValid =
        name.trim().length >= MIN &&
        name.trim().length <= MAX &&
        text.trim().length >= MAX &&
        text.trim().length <= MAX;

    function handleSubmit(e) {
        e.preventDefault();
        setTouched({ name: true, text: true });
        setName('');
        setText('');
        setTouched({ name: false, text: false });
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="comment-text" className="comment-form__label">
                Skriv din kommentar
            </label>
            <textarea
                id="comment-text"
                className={`comment-form__textarea ${errors.text ? 'has-error' : ''}`}
                placeholder="Skriv din kommentar..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, text: true }))}
                maxLength={MAX}
                rows={4}
            />
            <div className="comment-form__meta">
                <small className="hint">
                    {MIN}-{MAX} tecken.{' '}
                    <span>
                        {text.length}/{MAX}
                    </span>
                </small>
                {errors.text && <small className="error">{errors.text}</small>}
            </div>

            <div className="comment-form__row">
                <div className="comment-form__name-wrap">
                    <label
                        htmlFor="comment-name"
                        className="comment-form__label"
                    >
                        Ditt namn
                    </label>
                    <input
                        id="comment-name"
                        className={`comment-form__input ${errors.name ? 'has-error' : ''}`}
                        type="text"
                        placeholder="Fyll i ditt namn"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        maxLength={MAX}
                    />
                    <div className="comment-form__meta">
                        <small className="hint">
                            {MIN}-{MAX} tecken.{' '}
                            <span>
                                {name.length}/{MAX}
                            </span>
                        </small>
                        {errors.name && (
                            <small className="error">{errors.name}</small>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="button comment-form__submit"
                    disabled={!isValid}
                >
                    Skicka!
                </button>
            </div>
        </form>
    );
}
export default CommentForm;
