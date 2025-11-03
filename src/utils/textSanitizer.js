function textSanitizer(text) {
    return text.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
}

export default textSanitizer;
