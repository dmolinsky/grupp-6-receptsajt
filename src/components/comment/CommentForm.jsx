import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { validateComment } from '../../utils/validateComment';

function CommentForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [touched, setTouched] = useState({ name: false, text: false });

    const MAX_COMMENT = 500;
    const MAX_NAME = 100;

    const trimmedName = name.trim();
    const trimmedText = text.trim();
    const nameLen = trimmedName.length;
    const textLen = trimmedText.length;

    const errors = useMemo(
        () => validateComment({ name, text, touched }),
        [name, text, touched]
    );

    const bothTouched = touched.name && touched.text;
    const isValid = bothTouched && Object.keys(errors).length === 0;

    function handleSubmit(e) {
        e.preventDefault();

        const nextTouched = { name: true, text: true };
        const nextErrors = validateComment({
            name,
            text,
            touched: nextTouched,
        });
        const nextIsValid =
            nextTouched.name &&
            nextTouched.text &&
            Object.keys(nextErrors).length === 0;

        if (!nextIsValid) {
            setTouched(nextTouched);
            return;
        }

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
                    aria-describedby={errors.text ? 'comment-text-error' : 'comment-text-hint'}
                />
                <small id="comment-text-hint" className="hint">
                    <span>
                        {textLen}/{MAX_COMMENT}
                    </span>
                </small>
            </div>
            <div className="comment-form__meta">
                {errors.text &&
                    <small id="comment-text-error" className="error" role="alert">
                        {errors.text}
                    </small>}
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
                        aria-describedby={errors.name ? 'comment-name-error' : undefined}
                    />
                    <small id="input-hint" className="hint">
                        <span>
                            {nameLen}/{MAX_NAME}
                        </span>
                    </small>
                </div>

                <div className="comment-form__meta">
                    {errors.name && (
                        <small id="comment-name-error" className="error" role="alert">
                            {errors.name}
                        </small>
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

CommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
