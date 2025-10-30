const INVALID_TAGS = /[<>]/;
const INVALID_NAME = /[^a-zA-ZåäöÅÄÖ\s'-]/;
const INVALID_TEXT = /[^a-zA-ZåäöÅÄÖ0-9\s.,!?'"()\n-]/;
const INVALID_NEWLINES = /(\r?\n){5,}/;
const INVALID_LINKS = /https?:\/\//i;

const MIN_NAME = 2;
const MAX_NAME = 100;
const MIN_COMMENT = 2;
const MAX_COMMENT = 500;

export function validateComment({ name, text, touched }) {
    const e = {};
    const rawText = text;
    const normalized = rawText.replace(/\r\n/g, '\n');
    const trimmedName = name.trim();
    const trimmedText = text.trim();
    const nameLen = trimmedName.length;
    const textLen = trimmedText.length;

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
                : `Din kommentar måste vara mellan ${MIN_COMMENT}-${MAX_COMMENT} tecken lång!`;
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

    if (touched.text && INVALID_NEWLINES.test(normalized)) {
        e.text = 'Kommentaren får inte innehålla för många radbrytningar.';
    }

    if (touched.text && INVALID_LINKS.test(trimmedText)) {
        e.text = 'Kommentaren får inte innehålla länkar.';
    }

    return e;
}
