import { test, expect } from '@playwright/test';

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
