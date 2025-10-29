import { test, expect } from '@playwright/test';

test.describe('Startsida - Receptflöde', () => {
    const baseUrl = '/'; // ingen aning om path är rätt

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

    test('visar kategorier', async ({ page }) => {
        await page.goto(baseUrl);

        await expect(
            page.locator('.category-list').filter({ hasText: 'Varma rätter' })
        ).toBeVisible();
    });

    test('filtrerar receptlistan vid sökning på "jul"', async ({ page }) => {
        await page.goto(baseUrl);

        const search = page.getByPlaceholder('Sök recept');

        await search.fill('jul');

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'julskinka' })
        ).toBeVisible();

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Knäck' })
        ).not.toBeVisible();

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Ischoklad' })
        ).not.toBeVisible();
    });

    test('rensar sökning och visar alla recept igen', async ({ page }) => {
        await page.goto(baseUrl);

        const search = page.getByPlaceholder('Sök recept');

        await search.fill('Knäck');

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Knäck' })
        ).toBeVisible();

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Julskinka' })
        ).not.toBeVisible();

        await search.clear();

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Julskinka' })
        ).toBeVisible();

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Julskinka' })
        ).toBeVisible();

        await expect(
            page.locator('.recipe-card-title').filter({ hasText: 'Ischoklad' })
        ).toBeVisible();
    });

    test('behåller filtrerad receptlista efter sidomladdning', async ({
        page,
    }) => {
        await page.goto(baseUrl);

        const search = page.getByPlaceholder('Sök recept');

        await search.fill('gröt');

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

        await page.goto(currentUrl);

        const newTitles = await page
            .locator('.recipe-card-title')
            .allTextContents();
        expect(newTitles.sort()).toEqual(savedTitles.sort());
    });

    //1
    // hämtar alla recept på startsidan
    // skriv in "gröt"
    // efter sök ska receptlistan visa en filtrerad lista
    // page.locator för att hitta search bar
    // .type('gröt') in input lr update på input value
    // await -> sen räkna hur många recept som finns

    //2
    // rensar alla visa igen
    // input value  clear, gå tillbaka till startsidan inte reload
    // en ny await å sen räkna om receptlistan ska visa alla recept

    //3
    // hämtar alla recept på startsidan
    // skriv in "gröt"
    // efter sök ska receptlistan visa en filtrerad lista
    // spara vilka recept du får
    // hittar url i webbrowser
    // goToPage på hittad url för att se om det finns kvar efter reload
    // compare på sparad recept mot url
});
