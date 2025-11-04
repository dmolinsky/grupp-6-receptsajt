import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import RecipeGrid, {
    RecipeGridContainer,
} from '../../components/RecipeGrid/RecipeGrid.jsx';
import { useRecipes } from '../../hooks/useRecipes';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        Navigate: vi.fn(),
    };
});
vi.mock('../../hooks/useRecipes', () => ({
    useRecipes: vi.fn(),
}));

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

describe('RecipeGrid', () => {
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

        rerender(
            <MemoryRouter>
                <RecipeGrid recipes={mockRecipes} searchQuery={''} />
            </MemoryRouter>
        );
        expect(screen.getByText('Pepparkakor')).toBeInTheDocument();
        expect(screen.getByText('Lussekatter')).toBeInTheDocument();
        expect(screen.getByText('Saffranskladdkaka')).toBeInTheDocument();
    });
});

describe('RecipeGridContainer', () => {
    it('shows recipes', () => {
        useRecipes.mockReturnValue({
            recipes: mockRecipes,
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter>
                <RecipeGridContainer />
            </MemoryRouter>
        );

        expect(screen.getByText('Pepparkakor')).toBeInTheDocument();
    });

    it('shows loading state', () => {
        useRecipes.mockReturnValue({
            recipes: [],
            loading: true,
            error: null,
        });

        render(
            <MemoryRouter>
                <RecipeGridContainer />
            </MemoryRouter>
        );

        expect(screen.getByText('Laddar recept')).toBeInTheDocument();
    });

    it('shows error message on fetch error', () => {
        useRecipes.mockReturnValue({
            recipes: [],
            loading: false,
            error: 'Fetch error',
        });

        render(
            <MemoryRouter>
                <RecipeGridContainer />
            </MemoryRouter>
        );

        expect(screen.getByText('Kunde inte hämta recept')).toBeInTheDocument();
    });

    it('shows error message on fetch error with category', () => {
        useRecipes.mockReturnValue({
            recipes: [],
            loading: false,
            error: 'Fetch error',
        });

        render(
            <MemoryRouter>
                <RecipeGridContainer category="Desserter" />
            </MemoryRouter>
        );

        expect(
            screen.getByText(
                'Kunde inte hämta recepten i kategorin "Desserter"'
            )
        ).toBeInTheDocument();
    });

    it('shows empty state when no recipes', () => {
        useRecipes.mockReturnValue({
            recipes: [],
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter>
                <RecipeGridContainer />
            </MemoryRouter>
        );

        expect(screen.getByText('Inga recept!')).toBeInTheDocument();
        expect(
            screen.getByText('Det finns inga recept att visa ännu.')
        ).toBeInTheDocument();
    });

    it('shows empty state when no recipes with category', () => {
        useRecipes.mockReturnValue({
            recipes: [],
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter>
                <RecipeGridContainer category="Förrätter" />
            </MemoryRouter>
        );

        expect(screen.getByText('Inga recept!')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Det finns inga recept i kategorin "Förrätter" just nu.'
            )
        ).toBeInTheDocument();
    });
});
