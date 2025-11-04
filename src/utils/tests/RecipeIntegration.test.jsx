import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeGrid from 'src/components/RecipeGrid/RecipeGrid.jsx';
import { describe, expect, it, vi } from 'vitest';

vi.mock('src/utils/getAllRecipes', () => ({
    getAllRecipes: vi.fn(),
}));
vi.mock('src/utils/recipeMappers', () => ({
    mapApiRecipes: vi.fn((data) => data),
}));

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
        render(
            <MemoryRouter>
                <RecipeGrid recipes={mockRecipes} />
            </MemoryRouter>
        );

        await waitFor(() =>
            expect(screen.getByText('Pepparkakor')).toBeInTheDocument()
        );
        expect(screen.getByText('Lussekatter')).toBeInTheDocument();
    });
});
