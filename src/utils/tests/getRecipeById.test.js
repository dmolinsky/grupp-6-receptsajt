import { describe, expect, it } from 'vitest';
import { getRecipeById } from '../../utils/getRecipeById.js';

describe('getRecipeById', () => {
    // TODO: Enable this test after adding a fetch mock
    it.skip('should fetch a recipe by id', async () => {
        const id = '68f8984e8a8cd70776eaf67d';
        const data = await getRecipeById(id);

        expect(data).not.toBeNull();
        expect(data).toHaveProperty('_id');
    });
});
