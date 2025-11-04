function DifficultyBadge({ level }) {
    let text = '';
    let colorClass = '';

    switch (level) {
        case 1:
            text = 'Lätt';
            colorClass = 'difficulty-easy';
            break;
        case 2:
            text = 'Medel';
            colorClass = 'difficulty-medium';
            break;
        case 3:
            text = 'Svår';
            colorClass = 'difficulty-hard';
            break;
    }

    return (
        <div className="difficulty-badge-wrapper">
            <div className={`difficulty-badge round-md ${colorClass}`}>
                <span>{text}</span>
            </div>
        </div>
    );
}

export default DifficultyBadge;
