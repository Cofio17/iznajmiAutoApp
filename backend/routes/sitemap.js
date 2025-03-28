const express = require("express");
const router = express.Router();
const Car = require("../models/car");

router.get("/sitemap.xml", async (req, res) => {
    res.header("Content-Type", "application/xml");

    try {
        const cars = await Car.find();

        const pages = [
            { loc: "https://iznajmi.me/", priority: 1.0 },
            { loc: "https://iznajmi.me/rent-a-car", priority: 0.8 },
            { loc: "https://iznajmi.me/about_us", priority: 0.8 },
            { loc: "https://iznajmi.me/politika-privatnosti", priority: 0.3 },
            { loc: "https://iznajmi.me/politika-reklamacije", priority: 0.3 },
            { loc: "https://iznajmi.me/politika-otkazivanja", priority: 0.3 },
            { loc: "https://iznajmi.me/uslovi-rezervacije", priority: 0.3 },
            { loc: "https://iznajmi.me/uslovi-placanja", priority: 0.3 },
            { loc: "https://iznajmi.me/odgovornost", priority: 0.3 },
            { loc: "https://iznajmi.me/blog", priority: 0.8 },
            { loc: "https://iznajmi.me/reservation", priority: 0.2 },
            { loc: "https://iznajmi.me/blog/pravo-avanturisticno-putovanje-kroz-austriju/", priority: 0.7 },
            { loc: "https://iznajmi.me/blog/digitalni-detoks-otkrijte-srbiju-bez-ekrana/", priority: 0.7 },
            { loc: "https://iznajmi.me/blog/najbolji-automobili-za-iznajmljivanje-po-tipu-putovanja/", priority: 0.7 },
            { loc: "https://iznajmi.me/blog/kako-iznajmiti-automobil-bez-stresa/", priority: 0.7 },
            { loc: "https://iznajmi.me/rent-a-car-subotica/", priority: 0.9 },
        ];

        const carPages = cars.map((car) => ({
            loc: `https://iznajmi.me/rent-a-car/car/${car.licensePlate}`,
            lastmod: new Date().toISOString().split("T")[0],
            priority: 0.7,
        }));

        // Generisanje XML-a
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...pages, ...carPages]
                .map(
                    (page) => `
    <url>
        <loc>${page.loc}</loc>
        <lastmod>${page.lastmod || new Date().toISOString().split("T")[0]
                        }</lastmod>
        <priority>${page.priority}</priority>
    </url>`
                )
                .join("")}
</urlset>`;

        res.send(sitemap.trim()); // Trim da nema praznog prostora na početku
    } catch (error) {
        console.error("Greška pri generisanju sitemap-a:", error);
        res.status(500).send("Greška na serveru");
    }
});

module.exports = router;
