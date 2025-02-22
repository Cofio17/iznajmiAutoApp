import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

export default function PriceSlider() {

    const marks = [
        {
            value: 0,
            label: '0°C',
        },
        {
            value: 10,
            label: '10€',
        },
        {
            value: 20,

        },
        {
            value: 30,

        },
        {
            value: 50,
            label: '50€',
        },
        {
            value: 100,
            label: '100€',
        },
        {
            value: 200,
            label: '200€',
        },
    ];
    function valuetext(value) {
        return `${value}`;
    }

    return (
        <Box sx={{ maxWidth: 250 }}>
            <Typography gutterBottom>Cena</Typography> {/* Oznaka za slider */}
            <Slider
                aria-label="Price"
                defaultValue={200}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={null}
                marks={marks}
                min={10}
                max={200}
            />
        </Box>
    );
}
