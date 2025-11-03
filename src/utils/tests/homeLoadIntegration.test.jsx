import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';
import { MemoryRouter} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
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
];

const mockCategories = [
    { name: 'Varma rätter', count: 3 },
    { name: 'Söta rätter', count: 3 },
    { name: 'Kalla rätter', count: 3 },
];

function renderHome() {
    return render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );
}

describe('Home UI integration', () => {
    beforeEach(() => {
        window.scrollTo = vi.fn();

        vi.spyOn(window, 'fetch').mockImplementation(async (input) => {
            const url = typeof input === 'string' ? input : input.url;

            if (url.includes('/recipes')) {
                return { ok: true, json: async () => mockRecipes };
            }
            if (url.includes('/categories')) {
                return { ok: true, json: async () => mockCategories };
            }
            return { ok: false, status: 404, json: async () => ({}) };
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('homepage loads and shows recipe cards, category list and searchbar', async () => {
        renderHome();

        expect(await screen.findByAltText('Lussebullar')).toBeInTheDocument();
        expect(await screen.findByAltText('Julskinka')).toBeInTheDocument();

        expect(screen.getByRole('searchbox')).toBeInTheDocument();

        expect(await screen.findByText('Varma rätter')).toBeInTheDocument();
        expect(screen.findByText('Söta rätter')).toBeInTheDocument();
        expect(screen.findByText('Kalla rätter')).toBeInTheDocument();
    });
});