import { describe, expect, it } from 'vitest';
import { getAllCategories } from '../../utils/getAllCategories.js';

describe('getAllCategories', () => {
    // TODO: Enable this test after adding a fetch mock
    it.skip('should fetch all categories', async () => {
        const data = await getAllCategories();

        expect(data).not.toBeNull();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });
});
