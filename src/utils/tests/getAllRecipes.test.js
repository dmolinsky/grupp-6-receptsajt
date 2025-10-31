import { describe, it, expect } from 'vitest';

import { getAllRecipes } from 'src/utils/getAllRecipes.js';

describe('Integration: getAllRecipes', () => {
    it('should fetch all recipes', async () => {
        const data = await getAllRecipes();


        expect(data).not.toBeNull();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    }, 10000);
});