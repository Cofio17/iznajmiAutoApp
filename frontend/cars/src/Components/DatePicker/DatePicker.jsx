import React from 'react';
import TextField from '@mui/material/TextField';

function DatePickerExp({ dateExp, setDateExp, handleBlur, error }) {
    const handleChange = (e) => {
        let input = e.target.value.replace(/\D/g, ''); // Uklanja sve osim brojeva

        // Ograničava unos na 4 cifre
        if (input.length > 4) {
            input = input.slice(0, 4);
        }

        // Validacija i formatiranje
        if (input.length <= 2) {
            // Provera za mesec
            if (input.length === 2) {
                const month = parseInt(input);
                if (month < 1 || month > 12) {
                    return; // Ne dozvoljava nevalidan mesec
                }
                setDateExp(input + '/');
                return;
            }
            setDateExp(input);
        } else {
            // Dodavanje godine
            const month = input.slice(0, 2);
            const year = input.slice(2);
            setDateExp(`${month}/${year}`);
        }
    };

    return (
        <TextField
            onBlur={handleBlur}
            required
            label="MM/GG"
            value={dateExp || ''} // Koristi dateExp iz propova
            onChange={handleChange}
            inputProps={{
                maxLength: 5,
            }}
            placeholder="12/34"
            sx={{ width: '100px' }}
            className="mui-input reservation-form-input"
            error={error}
            helperText={error || 'Datum isteka vozačke dozvole'}
        />
    );
}

export default DatePickerExp;