import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';


const mockRecipes = [
    {
        _id: 1,
        title: 'Lussebullar',
        description: 'Mjuka lussebullar med saffran',
        imageUrl: '/images/lussebullar.png',
        avgRating: 3,
        price: 1,
        ingredients: [],
        timeInMins: 120,
    },
    {
        _id: 2,
        title: 'Julskinka',
        description: 'Klassisk svensk julskinka',
        imageUrl: '/images/julskinka.png',
        avgRating: 4,
        price: 1,
        ingredients: [],
        timeInMins: 90,
    },
    {
        _id: 3,
        title: 'Rödbetssallad',
        description: 'Enkel och klassisk rödbetssallad',
        imageUrl: '/images/rödbetssallad.png',
        avgRating: 5,
        price: 1,
        ingredients: [],
        timeInMins: 10,
    },
];

function renderHome() {
    return render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    )
}

describe('Home search integration', () => {
    beforeEach(() => {
        window.scrollTo = vi.fn();

        vi.spyOn(window, 'fetch').mockImplementation(async (input) => {
            const url = typeof input === 'string' ? input : input.url;

            if (url.includes('/recipes')) {
                return { ok: true, json: async () => mockRecipes };
            }
            if (url.includes('/categories')) {
                return { ok: true, json: async () => [] };
            }
            return { ok: false, status: 404, json: async () => ({}), };
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('shows all recipes, filters by search, restores recipes on clear', async () => {
        renderHome();

        await screen.findByAltText('Lussebullar');
        await screen.findByAltText('Julskinka');
        await screen.findByAltText('Rödbetssallad');

        const searchbox = screen.getByRole('searchbox');
        await userEvent.type(searchbox, 'Skinka{enter}');

        expect(await screen.findByAltText('Julskinka')).toBeInTheDocument();
        expect(screen.queryByAltText('Lussebullar')).not.toBeInTheDocument();
        expect(screen.queryByAltText('Rödbetssallad')).not.toBeInTheDocument();

        const clearButton = await screen.findByRole('button', { name: /rensa sökning/i });
        await userEvent.click(clearButton);

        expect(await screen.findByAltText('Julskinka')).toBeInTheDocument();
        expect(await screen.findByAltText('Lussebullar')).toBeInTheDocument();
        expect(await screen.findByAltText('Rödbetssallad')).toBeInTheDocument();
    });
});