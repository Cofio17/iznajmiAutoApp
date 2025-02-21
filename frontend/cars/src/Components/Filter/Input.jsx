import { Checkbox, FormControlLabel } from "@mui/material";

export default function Input({ value, label, onFilterChange, checked }) {
    const handleChange = (event) => {
        onFilterChange(value, event.target.checked); // Šalje vrednost i stanje
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    name={label}
                    onChange={handleChange}
                    checked={checked}
                    size="medium"
                    sx={{
                        marginLeft: 2,
                        color: '#2D6A4F',
                        '&.Mui-checked': { color: '#2D6A4F' }
                    }}
                />
            }
            label={label || "Neka klasa"}
        />
    );
}
