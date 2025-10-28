export function mapApiComment(apiComment) {
    if (!apiComment) {
        return {
            comment: '',
            name: '',
            date: '',
        };
    }

    if (Array.isArray(apiComment)) {

        //sort by date 
        return apiComment
            .slice()
            .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
            .map(mapApiComment);
    }

    return {
        comment: apiComment.comment || '',
        name: apiComment.name || '',
        date: apiComment.createdAt || '',
    };
}

export default mapApiComment;
