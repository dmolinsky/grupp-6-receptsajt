import { describe, expect, it } from 'vitest';
import { getRecipesByCategory } from '../../utils/getRecipesByCategory.js';

describe('getRecipesByCategory', () => {
    // TODO: Enable this test after adding a fetch mock
    it.skip('should fetch recipes for a given category', async () => {
        const category = 'varma rätter';
        const data = await getRecipesByCategory(category);

        expect(data).not.toBeNull();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });
});
