import React, { useMemo, useState } from 'react';

function CommentForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [touched, setTouched] = useState({ name: false, text: false });

    const MAX = 500;
    const MIN = 2;

    const trimmedName = name.trim();
    const trimmedText = text.trim();
    const nameLen = trimmedName.length;
    const textLen = trimmedText.length;

    const errors = useMemo(() => {
        const e = {};
        if (touched.name && (nameLen < MIN || nameLen > MAX)) {
            e.name =
                nameLen === 0
                    ? 'Namn är obligatoriskt.'
                    : `Mellan ${MIN}-${MAX} tecken.`;
        }
        if (touched.text && (textLen < MIN || textLen > MAX)) {
            e.text =
                textLen === 0
                    ? 'Kommentar är obligatoriskt.'
                    : `Mellan ${MIN}-${MAX} tecken.`;
        }
        return e;
    }, [nameLen, textLen, touched.name, touched.text]);

    const isValid =
        nameLen >= MIN &&
        nameLen <= MAX &&
        textLen >= MIN &&
        textLen <= MAX;

    function handleSubmit(e) {
        e.preventDefault();
        setTouched({ name: true, text: true });
        if (!isValid) return;
        onSubmit({ name: trimmedName, text: trimmedText });
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
                aria-invalid={!!errors.text}
                aria-describedby="comment-text-hint"
            />
            <div className="comment-form__meta">
                <small id="comment-text-hint" className="hint">
                    {MIN}-{MAX} tecken.{' '}
                    <span>
                        {textLen}/{MAX}
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
                        aria-invalid={!!errors.name}
                    />
                    <div className="comment-form__meta">
                        <small className="hint">
                            {MIN}-{MAX} tecken.{' '}
                            <span>
                                {nameLen}/{MAX}
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
                    aria-disabled={!isValid}
                >
                    Skicka!
                </button>
            </div>
        </form>
    );
}
export default CommentForm;
