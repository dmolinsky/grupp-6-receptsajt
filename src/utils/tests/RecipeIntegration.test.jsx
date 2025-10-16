import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeGrid from 'src/components/RecipeGrid/RecipeGrid.jsx';

vi.mock('src/utils/getAllRecipes', () => ({
    getAllRecipes: vi.fn(),
}));
vi.mock('src/utils/recipeMappers', () => ({
    mapApiRecipes: vi.fn((data) => data),
}));

import { getAllRecipes } from 'src/utils/getAllRecipes';

describe('Integration: RecipeGrid + RecipeCard', () => {
    const mockRecipes = [
        {
            id: 1,
            title: 'Pepparkakor',
            description: 'Klassiska kakor',
            image: '/img/pep.jpg',
        },
        {
            id: 2,
            title: 'Lussekatter',
            description: 'Med saffran',
            image: '/img/luss.jpg',
        },
    ];

    it('renders RecipeCards with data from getAllRecipes', async () => {
        getAllRecipes.mockResolvedValueOnce(mockRecipes);

        render(
            <MemoryRouter>
                <RecipeGrid />
            </MemoryRouter>
        );

        expect(screen.getByText(/laddar recept/i)).toBeInTheDocument();

        await waitFor(() =>
            expect(screen.getByText('Pepparkakor')).toBeInTheDocument()
        );
        expect(screen.getByText('Lussekatter')).toBeInTheDocument();

        expect(getAllRecipes).toHaveBeenCalledTimes(1);
    });
});
