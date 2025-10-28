export function mapApiComment(apiComment) {
    if (!apiComment) {
        return {
            comment: '',
            name: '',
            date: '',
        };
    }

    if (Array.isArray(apiComment)) {
        return apiComment.map(mapApiComment);
    }

    return {
        comment: apiComment.comment || '',
        name: apiComment.name || '',
        date: apiComment.createdAt || '',
    };
}

export default mapApiComment;
