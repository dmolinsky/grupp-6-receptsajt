import { describe, it, expect } from 'vitest';
import { getRecipeById } from 'src/utils/getRecipeById.js';

describe('getRecipeById', () => {
    it('should fetch a recipe by id', async () => {
        const id = '68e635488a8cd70776c1e261';
        const data = await getRecipeById(id);

        console.log('Fetched recipe:', data);

        expect(data).not.toBeNull();
        expect(data).toHaveProperty('_id');
    });
});
