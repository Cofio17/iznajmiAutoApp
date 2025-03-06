import { useState, useEffect } from 'react';
import { TextField, Slider, Box, Typography } from '@mui/material';

export default function PriceSlider({ maxPrice, setMaxPrice }) {
    const [price, setPrice] = useState(maxPrice); // Lokalno stanje za debounce
    const marks = [
        { value: 30, label: "30€" },
        { value: 50, label: "" },
        { value: 100, label: "100€" },
        { value: 200, label: "200€" },
    ];

    // Debounce efekat - ažurira setMaxPrice samo nakon 300ms pauze
    useEffect(() => {
        const handler = setTimeout(() => {
            setMaxPrice(price);
            console.log("Cena potvrđena:", price);
        }, 300);

        return () => clearTimeout(handler); // Očisti timeout ako se vrednost promeni pre nego što istekne 300ms
    }, [price, setMaxPrice]);

    // Ažuriraj lokalno stanje kada se maxPrice promeni
    useEffect(() => {
        setPrice(maxPrice);
    }, [maxPrice]);


    return (
        <Box sx={{ maxWidth: 300 }}>
            <Typography gutterBottom>Cena/Dan <b>{maxPrice}€</b> </Typography>
            <Slider
                aria-label="Price"
                value={maxPrice}
                onChange={(e, newValue) => setPrice(newValue)} // Ažurira lokalno stanje odmah
                valueLabelDisplay="auto"
                step={null}
                marks={marks}
                min={10}
                max={200}
            />
        </Box>
    );
}
