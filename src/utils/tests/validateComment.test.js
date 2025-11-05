import { validateComment } from '../validateComment';
import { describe, test, expect } from 'vitest';

describe('validateComment', () => {
    test('returns no errors for valid input', () => {
        const result = validateComment({
            name: 'Anna Andersson',
            text: 'Vilket gott recept!',
            touched: { name: true, text: true },
        });
        expect(result).toEqual({});
    });

    test('returns error if name is empty', () => {
        const result = validateComment({
            name: '',
            text: 'Hej!',
            touched: { name: true, text: true },
        });
        expect(result.name).toBe('Vänligen fyll i ditt namn!');
    });

    test('returns error if comment is empty', () => {
        const result = validateComment({
            name: 'Anna',
            text: '',
            touched: { name: true, text: true },
        });
        expect(result.text).toBe('Din kommentar är helt tom!');
    });

    test('returns error if comment contains HTML', () => {
        const result = validateComment({
            name: 'Anna',
            text: '<script>alert("x")</script>',
            touched: { name: true, text: true },
        });
        expect(result.text).toBe(
            'Kommentaren får inte innehålla HTML-taggar eller andra otillåtna tecken.'
        );
    });

    test('returns error if name contains invalid characters', () => {
        const result = validateComment({
            name: 'Anna123',
            text: 'Hej!',
            touched: { name: true, text: true },
        });
        expect(result.name).toBe(
            'Namnet får bara innehålla bokstäver, mellanslag och bindestreck.'
        );
    });

    test('returns error if comment contains too many newlines', () => {
        const result = validateComment({
            name: 'Anna',
            text: '\n\n\n\n\nHej där',
            touched: { name: true, text: true },
        });
        expect(result.text).toBe(
            'Kommentaren får inte innehålla för många radbrytningar.'
        );
    });

    test('returns error if comment contains link', () => {
        const result = validateComment({
            name: 'Anna',
            text: 'Kolla https://example.com',
            touched: { name: true, text: true },
        });
        expect(result.text).toBe('Kommentaren får inte innehålla länkar.');
    });

    test('returns error if comment too short', () => {
        const result = validateComment({
            name: 'Anna',
            text: 'A',
            touched: { name: true, text: true },
        });
        expect(result.text).toBe(
            'Din kommentar måste vara mellan 2-500 tecken lång!'
        );
    });

    test('returns error if comment too long', () => {
        const longText = 'A'.repeat(501);
        const result = validateComment({
            name: 'Anna',
            text: longText,
            touched: { name: true, text: true },
        });
        expect(result.text).toBe(
            'Din kommentar måste vara mellan 2-500 tecken lång!'
        );
    });
});
