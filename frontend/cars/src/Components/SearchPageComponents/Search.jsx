import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Autocomplete } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

/**
 * 
 * @returns Component that contains search bar and search with dates
 */
export default function Search() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const maxDate = dayjs().add(3, 'month');
    const [city, setCity] = useState(null);

    const cities = [
        'Subotica',
        'Novi Sad',
        'Belgrade',
        'Kragujevac',
        'Niš',
    ];



    const searchCars = () => {

    }

    return (
        <div className="search-bar" id="search-bar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={startDate}
                    label="Starting Date"
                    disablePast={true}
                    maxDate={maxDate}
                    onChange={(newValue) => { setStartDate(newValue) }}
                    format='DD/MM/YYYY'
                    className='mui-input'


                />
                <DatePicker
                    value={endDate}
                    label="Ending Date"
                    disablePast={true}
                    maxDate={maxDate}
                    onChange={(newValue) => { setEndDate(newValue) }}
                    format='DD/MM/YYYY'
                    className='mui-input'

                />
            </LocalizationProvider>
            <Autocomplete

                options={cities}
                getOptionLabel={(option) => option}
                onChange={(e, newValue) => {
                    setCity(newValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Choose a city" variant="outlined" />
                )}
                style={{ width: 230 }}
                className='mui-input'


            />
            <div onClick={searchCars} className='search-bar-icon' >
                <FontAwesomeIcon icon={faMagnifyingGlass} color='black' size='2x' />
            </div>
        </div>
    );
}

//formating date into appropriate format so it can be sent to google api
const formatDate = (date) => {
    if (!date) return 'None';
    const formattedDate = date.format('DD-MM-YYYYT10:00:00');
    return formattedDate;
};
