import { FormLabel, FormGroup } from "@mui/material";
import Input from "./Input";

export default function FilterGroup({ group, onFilterChange, selectedFilters }) {
    return (
        <FormGroup>
            <FormLabel style={{ fontSize: 20 }} component="legend">
                {group.legend || "Kategorija"}
            </FormLabel>
            {group.inputs.map((input) => (
                <Input
                    key={input}
                    label={input}
                    value={input}
                    onFilterChange={onFilterChange}
                    checked={selectedFilters.includes(input)} // Proveri da li je selektovano
                />
            ))}
        </FormGroup>
    );
}
