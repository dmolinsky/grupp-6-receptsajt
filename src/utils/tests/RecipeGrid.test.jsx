import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeGrid from 'src/components/RecipeGrid/RecipeGrid.jsx';

vi.mock('src/utils/getAllRecipes', () => ({
    getAllRecipes: vi.fn(),
}));
vi.mock('src/utils/getRecipesByCategory', () => ({
    getRecipesByCategory: vi.fn(),
}));
vi.mock('src/utils/recipeMappers', () => ({
    mapApiRecipes: vi.fn((data) => data),
}));

import { getAllRecipes } from 'src/utils/getAllRecipes';

describe('RecipeGrid', () => {
    const mockRecipes = [
        {
            id: 1,
            title: 'Pepparkakor',
            description: 'Klassiska julkakor med kanel och ingefära',
            image: '/images/pepparkakor.jpg',
        },
        {
            id: 2,
            title: 'Lussekatter',
            description: 'Mjuka lussebullar med saffran',
            image: '/images/lussekatter.jpg',
        },
    ];

    it('should render correct number of recipe cards', async () => {
        getAllRecipes.mockResolvedValueOnce(mockRecipes);

        render(
            <MemoryRouter>
                <RecipeGrid />
            </MemoryRouter>
        );

        await waitFor(() =>
            expect(screen.getByText('Pepparkakor')).toBeInTheDocument()
        );

        const titles = screen.getAllByText(/Pepparkakor|Lussekatter/);
        expect(titles.length).toBe(2);
    });
});
