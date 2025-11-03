import { describe, it, expect } from 'vitest';
import textSanitizer from '../textSanitizer.js';

describe('textSanitizer', () => {
    it('should sanitize all string fields in recipe object', () => {
        const dirtyRecipe = {
            _id: '68f8984e8a8cd70776eaf67d',
            title: 'Julskinka<script>alert(1)</script>',
            description:
                'Klassisk svensk<script>alert(2)</script> julskinka',
            imageUrl: '<script>alert(5)</script>',
            timeInMins: 90,
            price: 1,
            categories: ['varma rätter'],
            instructions: [
                'Koka skinkan <script>alert(4)</script>tills innertemperaturen är 70°C.',
                '<script>alert(6)</script>Låt svalna något.',
            ],
            ingredients: [
                {
                    name: 'Rimmad skinka<script>alert(7)</script>',
                    amount: 1.5,
                    unit: 'kg',
                    _id: '1',
                },
                { name: 'Senap', amount: 3, unit: 'msk', _id: '2' },
            ],
            avgRating: 3.4,
        };

        //from object to string
        const dirtyText = JSON.stringify(dirtyRecipe);

        //clean it
        let clean = textSanitizer(dirtyText);

        //parse back to object
        clean = JSON.parse(clean);

        expect(clean.title).toBe('Julskinka');
        expect(clean.description).toBe('Klassisk svensk julskinka');
        expect(clean.instructions[0]).toBe(
            'Koka skinkan tills innertemperaturen är 70°C.'
        );
        expect(clean.instructions[1]).toBe('Låt svalna något.');
        expect(clean.ingredients[0].name).toBe('Rimmad skinka');
        expect(clean.ingredients[1].unit).toBe('msk');
    });
});
