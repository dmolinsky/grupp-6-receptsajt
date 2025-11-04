const INVALID_TAGS = /[<>]/;
const INVALID_NAME = /[^a-zA-ZåäöÅÄÖ\s'-]/;
const INVALID_TEXT = /[^a-zA-ZåäöÅÄÖ0-9\s.,!?'"()-]/;
const INVALID_NEWLINES = /(\r?\n){5,}/;
const INVALID_LINKS = /https?:\/\//i;

const MIN_NAME = 2;
const MAX_NAME = 100;
const MIN_COMMENT = 2;
const MAX_COMMENT = 500;

function validateName(name, touched) {
    if (!touched) return null;
    const trimmed = name.trim();
    const len = trimmed.length;

    if (len < MIN_NAME || len > MAX_NAME) {
        return len === 0
            ? 'Vänligen fyll i ditt namn!'
            : `Ditt namn måste vara mellan ${MIN_NAME}-${MAX_NAME} tecken långt!`;
    }
    if (INVALID_TAGS.test(trimmed)) {
        return 'Namnet får inte innehålla HTML-taggar eller andra otillåtna tecken.';
    }
    if (INVALID_NAME.test(trimmed)) {
        return 'Namnet får bara innehålla bokstäver, mellanslag och bindestreck.';
    }
    return null;
}

function validateText(text, touched) {
    if (!touched) return null;
    const rawText = text;
    const normalized = rawText.replaceAll('\r\n', '\n');
    const trimmed = text.trim();
    const len = trimmed.length;

    if (len < MIN_COMMENT || len > MAX_COMMENT) {
        return len === 0
            ? 'Din kommentar är helt tom!'
            : `Din kommentar måste vara mellan ${MIN_COMMENT}-${MAX_COMMENT} tecken lång!`;
    }
    if (INVALID_TAGS.test(trimmed)) {
        return 'Kommentaren får inte innehålla HTML-taggar eller andra otillåtna tecken.';
    }
    if (INVALID_LINKS.test(trimmed)) {
        return 'Kommentaren får inte innehålla länkar.';
    }
    if (INVALID_NEWLINES.test(normalized)) {
        return 'Kommentaren får inte innehålla för många radbrytningar.';
    }
    if (INVALID_TEXT.test(trimmed)) {
        return 'Kommentaren får inte innehålla otillåtna tecken.';
    }
    return null;
}

export function validateComment({ name, text, touched }) {
    const e = {};
    const nameError = validateName(name, touched.name);
    const textError = validateText(text, touched.text);

    if (nameError) e.name = nameError;
    if (textError) e.text = textError;

    return e;
}
