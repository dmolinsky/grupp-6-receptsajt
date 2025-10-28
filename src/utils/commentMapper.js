export function mapApiComment(apiComment) {
    if (!apiComment) {
        return {
            comment: '',
            name: '',
            date: '',
        };
    }

    if (Array.isArray(apiComment)) {
        // Sort by createdAt (or date) descending before mapping
        return apiComment
            .slice() // avoid mutating original
            .sort(
                (a, b) =>
                    new Date(b.createdAt || b.date) -
                    new Date(a.createdAt || a.date)
            )
            .map(mapApiComment);
    }

    return {
        comment: apiComment.comment || '',
        name: apiComment.name || '',
        date: apiComment.createdAt || '',
    };
}

export default mapApiComment;
