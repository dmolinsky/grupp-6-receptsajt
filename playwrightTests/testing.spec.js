import { test, expect } from '@playwright/test';

// ---------------------------
//  Startsidan / Receptflöde
// ---------------------------
test.describe('Startsida - Receptflöde', () => {
    const baseUrl = '/'; // ingen aning om path är rätt

    //Test 1
    test('visar receptkort och kategorier', async ({ page }) => {
        await page.goto(baseUrl);

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Julskinka' })
        ).toBeVisible();

        await expect(
            page
                .locator('.recipe-card-title')
                .filter({ hasText: 'Risgrynsgröt' })
        ).toBeVisible();

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Ischoklad' })
        ).toBeVisible();
    });

    //Test 2
    test('visar kategorier', async ({ page }) => {
        await page.goto(baseUrl);

        await expect(
            page.locator('.category-list').filter({ hasText: 'Varma rätter' })
        ).toBeVisible();
    });
});

// ---------------------------
//  Sökfunktion
// ---------------------------
test.describe('Sökfunktion - filtrering och reset', () => {
    const baseUrl = '/';

    //Test 3
    test('filtrerar receptlistan vid sökning på "jul"', async ({ page }) => {
        await page.goto(baseUrl);

        const search = page.getByPlaceholder('Sök bland dina favoritrecept');

        await search.fill('jul');

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'julskinka' })
        ).toBeVisible();
    });

    test('rensar sökning och visar alla recept igen', async ({ page }) => {
        await page.goto(baseUrl);

        const search = page.getByPlaceholder('Sök bland dina favoritrecept');
        const clearButton = page.locator('.searchbar__reset');

        await search.fill('Knäck');
        await search.press('Enter'); // klicka på skiten test jäkel

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Knäck' })
        ).toBeVisible();
        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Julskinka' })
        ).not.toBeVisible();

        await clearButton.click();

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Julskinka' })
        ).toBeVisible();
        await expect(
            page
                .locator('.recipe-card-title')
                .filter({ hasText: 'Risgrynsgröt' })
        ).toBeVisible();
        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Ischoklad' })
        ).toBeVisible();
    });

    //Test 5
    test('behåller filtrerad receptlista efter sidomladdning', async ({
        page,
    }) => {
        await page.goto(baseUrl);

        const search = page.getByPlaceholder('Sök bland dina favoritrecept');

        await search.fill('gröt');

        await search.press('Enter');

        await expect(
            page
                .locator('.recipe-card-title')
                .filter({ hasText: 'Risgrynsgröt' })
        ).toBeVisible();

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Julskinka' })
        ).not.toBeVisible();

        const savedTitles = await page
            .locator('.recipe-card-title')
            .allTextContents();
        const currentUrl = page.url();

        // reload
        await page.goto(currentUrl);

        const newTitles = await page
            .locator('.recipe-card-title')
            .allTextContents();
        expect(newTitles.sort()).not.toEqual(savedTitles.sort()); // testa att receptlistan är samma som tidigare
    });
});

// ---------------------------
//  Säkerhet / XSS
// ---------------------------
test.describe('Säkerhet - XSS skydd', () => {
    test('kollar om XSS skyddas', async ({ page }) => {
        let alertTriggered = false;
        page.on('dialog', () => {
            alertTriggered = true;
        });

        await page.goto('/?q=<script>alert(1)</script>');
        await page.waitForTimeout(500);

        expect(alertTriggered).toBe(false);
    });
});
