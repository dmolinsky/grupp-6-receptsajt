import { describe, it, expect } from 'vitest';
import { getRecipeById } from 'src/utils/getRecipeById.js';

describe('Integration: getRecipeById', () => {
    it('should fetch a recipe by id', async () => {
        const id = '68f8984e8a8cd70776eaf67d';
        const data = await getRecipeById(id);

        expect(data).not.toBeNull();
        expect(data).toHaveProperty('_id');
    });
});
