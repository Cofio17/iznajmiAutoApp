import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography'
import { useState } from 'react';


export default function PriceSlider({ maxPrice, setMaxPrice }) {

    const [price, setPrice] = useState(200);
    const marks = [
        { value: 30, label: "30€" },
        { value: 50, label: "" },
        { value: 100, label: "100€" },
        { value: 200, label: "200€" },
    ];
    return (
        <Box sx={{ maxWidth: 300 }}>
            <Typography gutterBottom>Cena/Dan</Typography> {/* Oznaka za slider */}
            <Slider
                aria-label="Price"
                value={maxPrice}
                onChangeCommitted={(e, newValue) => {
                    setMaxPrice(newValue);
                    console.log("Cena potvrđena:", newValue); // Loguje konačan izbor
                }}
                valueLabelDisplay="auto"
                step={null}
                marks={marks}
                min={10}
                max={200}
            />
        </Box>
    );
}
