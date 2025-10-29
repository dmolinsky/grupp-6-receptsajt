import { describe, expect, it } from 'vitest';
import { getAllRecipes } from '../../utils/getAllRecipes.js';

describe('getAllRecipes', () => {
    // TODO: Enable this test after adding a fetch mock
    it.skip('should fetch all recipes', async () => {
        const data = await getAllRecipes();

        expect(data).not.toBeNull();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    }, 10000);
});
