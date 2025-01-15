import { Checkbox, FormControlLabel } from "@mui/material";

export default function Input({ value, label, onFilterChange, checked }) {
    const handleChange = (event) => {
        onFilterChange(value, event.target.checked); // Šalje vrednost i stanje
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    onChange={handleChange}
                    checked={checked}
                    size="medium"
                    sx={{
                        marginLeft: 2,
                        color: '#B69121',
                        '&.Mui-checked': { color: '#B69121' }
                    }}
                />
            }
            label={label || "Neka klasa"}
        />
    );
}
