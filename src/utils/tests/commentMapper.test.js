import { describe, it, expect } from 'vitest';
import mapApiComment from '/src/utils/commentMapper.js';

describe('mapApiComment', () => {
    it('sorts comments by date, newest first', () => {
        const comments = [
            {
                comment: 'Oldest',
                name: 'Kalle',
                createdAt: '2022-01-01T10:00:00Z',
            },
            {
                comment: 'Newest',
                name: 'Fnatte',
                createdAt: '2025-10-28T10:00:00Z',
            },
            {
                comment: 'Middle',
                name: 'Chatte',
                createdAt: '2024-05-15T10:00:00Z',
            },
        ];
        const result = mapApiComment(comments);
        expect(result[0].comment).toBe('Newest');
        expect(result[1].comment).toBe('Middle');
        expect(result[2].comment).toBe('Oldest');
    });

    it('handles empty array', () => {
        expect(mapApiComment([])).toEqual([]);
    });

    it('handles single comment object', () => {
        const comment = {
            comment: 'Test',
            name: 'X',
            createdAt: '2025-10-28T10:00:00Z',
        };
        expect(mapApiComment(comment)).toEqual({
            comment: 'Test',
            name: 'X',
            date: '2025-10-28T10:00:00Z',
        });
    });
});
