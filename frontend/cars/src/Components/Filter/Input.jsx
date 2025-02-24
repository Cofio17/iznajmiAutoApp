import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";

export default function Input({ value, required = false, label, onFilterChange, checked, onChangeProp = undefined, groupLegend }) {
    const handleChange = (event) => {
        onFilterChange(value, event.target.checked); // Šalje vrednost i stanje
    };

    return (
        <FormControlLabel
            required={required}
            control={
                <Checkbox
                    name={label}
                    onChange={onChangeProp || handleChange}
                    checked={checked}
                    size="medium"
                    sx={{
                        marginLeft: 2,
                        color: "#2D6A4F",
                        "&.Mui-checked": { color: "#2D6A4F" }
                    }}
                />
            }
            label={
                <Typography component="span">
                    {label} {groupLegend === 'Gepek' && <FontAwesomeIcon className="font-awsome-icon" color="#2D6A4F" icon={faSuitcaseRolling} />}
                </Typography>
            }
        />
    );
}
