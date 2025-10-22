import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Recipe from 'src/components/Recipe/Recipe.jsx';
import * as api from '../../utils/getRecipeById';

vi.mock('../../utils/getRecipeById', () => ({
    getRecipeById: vi.fn(),
}));

function renderWithRouter(recipeId = '1') {
    return render(
        <MemoryRouter initialEntries={[`/recipes/${recipeId}`]}>
            <Routes>
                <Route path="/recipes/:recipeId" element={<Recipe />} />
            </Routes>
        </MemoryRouter>
    );
}

describe('Recipe component', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('renders error message when recipe fetch fails', async () => {
        api.getRecipeById.mockRejectedValueOnce(new Error('Network error'));

        renderWithRouter('1');

        expect(screen.getByText(/Laddar recept/i)).toBeInTheDocument();

        await waitFor(() =>
            expect(
                screen.getByText(/Kunde inte hämta receptet/i)
            ).toBeInTheDocument()
        );
    });

    it('renders error message when no recipe data is returned', async () => {
        api.getRecipeById.mockResolvedValueOnce(null);

        renderWithRouter('999');

        expect(screen.getByText(/Laddar recept/i)).toBeInTheDocument();

        await waitFor(() =>
            expect(
                screen.getByText(/Kunde inte hämta receptet/i)
            ).toBeInTheDocument()
        );
    });
});
