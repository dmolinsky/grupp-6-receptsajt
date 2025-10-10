import { describe, it, expect } from 'vitest';

import { getRecipesByCategory } from 'src/utils/getRecipesByCategory.js';

describe('getRecipesByCategory', () => {
    it('should fetch recipes for a given category', async () => {
        const category = 'vegetariskt';
        const data = await getRecipesByCategory(category);

        // console.log(`Fetched recipes for category "${category}":`, data);

        expect(data).not.toBeNull();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });
});
