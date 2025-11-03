import { describe, it, expect } from "vitest";
import sanitizeText from "../textSanitizer.js";

describe("sanitizeRecipe", () => {
    it("should sanitize all string fields in recipe object", () => {
        const dirtyRecipe = {
            _id: "68f8984e8a8cd70776eaf67d",
            title: 'Julskinka <script>alert(1)</script>',
            description: 'Klassisk svensk <img src=x onerror="alert(2)"> julskinka',
            imageUrl: 'javascript:alert(3)',
            timeInMins: 90,
            price: 1,
            categories: ["varma rätter"],
            instructions: [
                'Koka skinkan </b><b onclick="alert(4)">tills innertemperaturen är 70°C.',
                '<svg onload=alert(5)> Låt svalna något.',
            ],
            ingredients: [
                { name: 'Rimmad skinka <iframe src=evil>', amount: 1.5, unit: "kg", _id: "1" },
                { name: 'Senap', amount: 3, unit: "<b>msk</b>", _id: "2" },
            ],
            avgRating: 3.4
        };

        //from object to string
        const dirtyText = JSON.stringify(dirtyRecipe);

        //clean it
        let clean = sanitizeText(dirtyText);

        //parse back to object
        clean = JSON.parse(clean);

        expect(clean.title).toBe("Julskinka");
        expect(clean.imageUrl).toBe("javascript:alert(3)");
        expect(clean.description).toBe("Klassisk svensk julskinka");
        expect(clean.instructions[0]).toBe("Koka skinkan tills innertemperaturen är 70°C.");
        expect(clean.instructions[1]).toBe("Låt svalna något.");
        expect(clean.ingredients[0].name).toBe("Rimmad skinka");
        expect(clean.ingredients[1].unit).toBe("msk");
    });
});
