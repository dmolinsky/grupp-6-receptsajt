import { describe, it, expect } from 'vitest';

import { getAllCategories } from 'src/utils/getAllCategories.js';

describe('getAllCategories', () => {
    it('should fetch all categories', async () => {
        const data = await getAllCategories();

        // console.log('Fetched categories:', data);

        expect(data).not.toBeNull();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });
});
