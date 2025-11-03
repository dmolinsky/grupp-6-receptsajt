import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeGrid from 'src/components/RecipeGrid/RecipeGrid.jsx';
import { describe, expect, it, vi } from 'vitest';

vi.mock('src/utils/getAllRecipes', () => ({
    getAllRecipes: vi.fn(),
}));
vi.mock('src/utils/getRecipesByCategory', () => ({
    getRecipesByCategory: vi.fn(),
}));
vi.mock('src/utils/recipeMappers', () => ({
    mapApiRecipes: vi.fn((data) => data),
}));

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
        {
            id: 3,
            title: 'Saffranskladdkaka',
            description: 'Kladdig kaka med saffran',
            image: '/images/saffran.jpg',
        },
    ];

    it('should render correct number of recipe cards', async () => {
        render(
            <MemoryRouter>
                <RecipeGrid recipes={mockRecipes} />
            </MemoryRouter>
        );

        await waitFor(() =>
            expect(screen.getByText('Pepparkakor')).toBeInTheDocument()
        );

        const titles = screen.getAllByText(
            /Pepparkakor|Lussekatter|Saffranskladdkaka/
        );
        expect(titles.length).toBe(3);
    });

    it('filters by search query', () => {
        render(
            <MemoryRouter>
                <RecipeGrid recipes={mockRecipes} searchQuery="lussek" />
            </MemoryRouter>
        );

        expect(screen.getByText('Lussekatter')).toBeInTheDocument();
        expect(screen.queryByText('Pepparkakor')).not.toBeInTheDocument();
        expect(screen.queryByText('Saffranskladdkaka')).not.toBeInTheDocument();
    });

    it('matches case-insensitively', () => {
        render(
            <MemoryRouter>
                <RecipeGrid recipes={mockRecipes} searchQuery="SAFFrans" />
            </MemoryRouter>
        );

        expect(screen.getByText('Saffranskladdkaka')).toBeInTheDocument();
        expect(screen.queryByText('Pepparkakor')).not.toBeInTheDocument();
        expect(screen.queryByText('Lussekatter')).not.toBeInTheDocument();
    });

    it('shows message when no recipes match', () => {
        render(
            <MemoryRouter>
                <RecipeGrid recipes={mockRecipes} searchQuery="sushi" />
            </MemoryRouter>
        );

        expect(
            screen.getByText('Inga recept matchar din sökning.')
        ).toBeInTheDocument();
    });

    it('updates results when searchQuery changes', () => {
        const { rerender } = render(
            <MemoryRouter>
                <RecipeGrid recipes={mockRecipes} searchQuery="pepp" />
            </MemoryRouter>
        );
        expect(screen.getByText('Pepparkakor')).toBeInTheDocument();
        expect(screen.queryByText('Lussekatter')).not.toBeInTheDocument();

        rerender(
            <MemoryRouter>
                <RecipeGrid recipes={mockRecipes} searchQuery="lusse" />
            </MemoryRouter>
        );
        expect(screen.getByText('Lussekatter')).toBeInTheDocument();
        expect(screen.queryByText('Pepparkakor')).not.toBeInTheDocument();
    });
});
