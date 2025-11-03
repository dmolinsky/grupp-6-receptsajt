import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';


const mockRecipes = [
    {
        id: '1',
        title: 'Lussebullar',
        description: 'Mjuka lussebullar med saffran',
        image: '/images/lussebullar.png',
        avgRating: 3,
        price: 1,
        ingredients: [],
        instructions: [],
        cookingTime: 10,
    },
    {
        id: '2',
        title: 'Julskinka',
        description: 'Klassisk svensk julskinka',
        image: '/images/julskinka.png',
        avgRating: 4,
        price: 2,
        ingredients: [],
        instructions: [],
        cookingTime: 20,
    },
    {
        id: '3',
        title: 'Rödbetssallad',
        description: 'Enkel och klassisk rödbetssallad',
        image: '/images/rödbetssallad.png',
        avgRating: 5,
        price: 3,
        ingredients: [],
        instructions: [],
        cookingTime: 30,
    },
];

function makeFetchMock() {
    return vi.fn(async (url) => {
        if (String(url).includes('/recipes')) {
            return { ok: true, json: async () => mockRecipes }
        }
        if (String(url).includes('/categories')) {
            return { ok: true, json: async () => [] }
        }
        return { ok: true, status: 404, json: async () => ({}) };
    });
}

function renderHome() {
    return render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    )
}

describe('Home search integration', () => {
    beforeEach(() => {
        vi.spyOn(window, 'fetch').mockImplementation(makeFetchMock());
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('filters recipes via the search field and clearing shows all recipes again', async () => {
        renderHome();

        await screen.findByAltText('Lussebullar');
        await screen.findByAltText('Julskinka');
        await screen.findByAltText('Rödbetssallad');

        const searchbox = screen.getByRole('searchbox');
        await userEvent.type(searchbox, 'Skinka{enter}');

        expect(await screen.findByAltText('Skinka')).toBeInTheDocument();
        expect(screen.queryByAltText('Lussebullar')).not.toBeInTheDocument();
        expect(screen.queryByAltText('Rödbetssallad')).not.toBeInTheDocument();

        const clearButton = await screen.findByRole('button', { name: /rensa sökning/i });
        await userEvent.click(clearButton);
    });
});