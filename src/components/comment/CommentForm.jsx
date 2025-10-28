import { useMemo, useState } from 'react';

const INVALID_TAGS = /[<>]/;
const INVALID_NAME = /[^a-zA-ZåäöÅÄÖ\s'-]/;
const INVALID_TEXT = /[^a-zA-ZåäöÅÄÖ0-9\s.,!?'"()\n-]/;
const INVALID_NEWLINES = /\n{5,}/;
const INVALID_LINKS = /https?:\/\//i;

function CommentForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [touched, setTouched] = useState({ name: false, text: false });

    const MAX_COMMENT = 500;
    const MIN_COMMENT = 2;
    const MAX_NAME = 100;
    const MIN_NAME = 2;

    const trimmedName = name.trim();
    const trimmedText = text.trim();
    const nameLen = trimmedName.length;
    const textLen = trimmedText.length;

    const errors = useMemo(() => {
        const e = {};
        if (touched.name && (nameLen < MIN_NAME || nameLen > MAX_NAME)) {
            e.name =
                nameLen === 0
                    ? 'Vänligen fyll i ditt namn!'
                    : `Ditt namn måste vara mellan ${MIN_NAME}-${MAX_NAME} tecken långt!`;
        }
        if (touched.text && (textLen < MIN_COMMENT || textLen > MAX_COMMENT)) {
            e.text =
                textLen === 0
                    ? 'Din kommentar är helt tom!'
                    : `Mellan ${MIN_COMMENT}-${MAX_COMMENT} tecken.`;
        }

        if (touched.text && INVALID_TAGS.test(trimmedText)) {
            e.text =
                'Kommentaren får inte innehålla HTML-taggar eller andra otillåtna tecken.';
        }

        if (touched.name && INVALID_TAGS.test(trimmedName)) {
            e.name =
                'Namnet får inte innehålla HTML-taggar eller andra otillåtna tecken.';
        }

        if (touched.name && INVALID_NAME.test(trimmedName)) {
            e.name =
                'Namnet får bara innehålla bokstäver, mellanslag och bindestreck.';
        }

        if (touched.text && INVALID_TEXT.test(trimmedText)) {
            e.text = 'Kommentaren innehåller otillåtna tecken.';
        }

        if (touched.text && INVALID_NEWLINES.test(trimmedText)) {
            e.text = 'Kommentaren får inte innehålla för många radbrytningar.';
        }

        if (touched.text && INVALID_LINKS.test(trimmedText)) {
            e.text = 'Kommentaren får inte innehålla länkar.';
        }

        return e;
    }, [
        nameLen,
        textLen,
        touched.name,
        touched.text,
        trimmedName,
        trimmedText,
    ]);

    const isValid =
        nameLen >= MIN_NAME &&
        nameLen <= MAX_NAME &&
        textLen >= MIN_COMMENT &&
        textLen <= MAX_COMMENT &&
        !INVALID_TAGS.test(trimmedText) &&
        !INVALID_TAGS.test(trimmedName) &&
        !INVALID_TEXT.test(trimmedText) &&
        !INVALID_NEWLINES.test(trimmedText) &&
        !INVALID_LINKS.test(trimmedText);

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
                Skriv din kommentar:
            </label>
            <div className="comment-textarea-wrapper">
                <textarea
                    id="comment-text"
                    className={`comment-form__textarea ${errors.text ? 'has-error' : ''}`}
                    placeholder="Skriv din kommentar här..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, text: true }))}
                    maxLength={MAX_COMMENT}
                    rows={4}
                    aria-invalid={!!errors.text}
                    aria-describedby="comment-text-hint"
                />
                <small id="comment-text-hint" className="hint">
                    <span>
                        {textLen}/{MAX_COMMENT}
                    </span>
                </small>
            </div>
            <div className="comment-form__meta">
                {errors.text && <small className="error">{errors.text}</small>}
            </div>

            <label htmlFor="comment-name" className="comment-form__label">
                Fyll i ditt namn:
            </label>
            <div className="comment-form__row">
                <div className="comment-input-wrapper">
                    <input
                        id="comment-name"
                        className={`comment-form__input ${errors.name ? 'has-error' : ''}`}
                        type="text"
                        placeholder="Fyll i ditt namn här..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        maxLength={MAX_NAME}
                        aria-invalid={!!errors.name}
                    />
                    <small id="input-hint" className="hint">
                        <span>
                            {nameLen}/{MAX_NAME}
                        </span>
                    </small>
                </div>

                <div className="comment-form__meta">
                    {errors.name && (
                        <small className="error">{errors.name}</small>
                    )}
                </div>

                <button
                    type="submit"
                    className="button comment-form__submit"
                    disabled={!isValid}
                    aria-disabled={!isValid}
                >
                    Skicka
                </button>
            </div>
        </form>
    );
}
export default CommentForm;
