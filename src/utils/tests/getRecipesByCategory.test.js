import { describe, it, expect } from 'vitest';

import { getRecipesByCategory } from 'src/utils/getRecipesByCategory.js';

describe('Integration: getRecipesByCategory', () => {
    it('should fetch recipes for a given category', async () => {
        const category = 'varma rätter';
        const data = await getRecipesByCategory(category);

        expect(data).not.toBeNull();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });
});
