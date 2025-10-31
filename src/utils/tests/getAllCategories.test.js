import { describe, it, expect, vi } from 'vitest';

import { getAllCategories } from 'src/utils/getAllCategories.js';

describe('getAllCategories', () => {
    it('should fetch all categories', async () => {
        const data = await getAllCategories();

        // console.log('Fetched categories:', data);

        expect(data).not.toBeNull();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });

    it('should return correct category counts when API responds successfully', async () => {
        const mockData = [
            { name: 'kalla rätter', count: 3 },
            { name: 'söta rätter', count: 3 },
            { name: 'varma rätter', count: 3 },
        ];

        const mockResponse = {
            ok: true,
            json: () => Promise.resolve(mockData),
        };

        vi.stubGlobal(
            'fetch',
            vi.fn(() => Promise.resolve(mockResponse))
        );

        const data = await getAllCategories();

        expect(fetch).toHaveBeenCalledWith(
            'https://grupp6-rbwot.reky.se/categories'
        );

        expect(data).toEqual(mockData);

        const expectedCounts = {
            'kalla rätter': 3,
            'söta rätter': 3,
            'varma rätter': 3,
        };

        data.forEach((category) => {
            expect(expectedCounts).toHaveProperty(category.name);
            expect(category.count).toBe(expectedCounts[category.name]);
        });
    });

    it('should throw an error if API response is not ok', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    ok: false,
                    status: 500,
                })
            )
        );

        await expect(getAllCategories()).rejects.toThrow('HTTP error');
    });
});
