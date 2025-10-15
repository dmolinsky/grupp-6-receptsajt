import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeCard from 'src/components/RecipeCard/RecipeCard.jsx';

describe('RecipeCard', () => {
    const recipe = {
        id: 1,
        title: 'Pepparkakor',
        description: 'Klassiska julkakor med kanel och ingefära',
        image: '/images/pepparkakor.jpg',
    };

    it('should render the recipe title and description', () => {
        render(
            <MemoryRouter>
                <RecipeCard recipe={recipe} />
            </MemoryRouter>
        );
        expect(screen.getByText('Pepparkakor')).toBeInTheDocument();
        expect(screen.getByText(/kanel/i)).toBeInTheDocument();
    });

    ('should show image with correct alt text',
        () => {
            render(
                <MemoryRouter>
                    <RecipeCard recipe={recipe} />
                </MemoryRouter>
            );
            const img = screen.getByRole('img');
            expect(img).toHaveAttribute('src', recipe.imageUrl);
            expect(img).toHaveAttribute('alt', recipe.title);
        });
});
