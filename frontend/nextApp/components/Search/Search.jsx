"use client";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Autocomplete } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useRouter } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material';



export default function Search() {
    const localhost = process.env.NEXT_PUBLIC_SERVER;
    const searchLink = `${localhost}api/calendar/search`;

    const pathname = usePathname();

    const router = useRouter();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [city, setCity] = useState(null);
    const [loading, setLoading] = useState(false);
    const maxDate = dayjs().add(3, 'month');

    const cities = ['Subotica', 'Novi Sad', 'Beograd', 'Zrenjanin'];



    const handleSearch = async () => {
        try {
            await getCars();
            const params = new URLSearchParams();
            if (startDate) params.set('start-date', encodeURIComponent(startDate));
            if (endDate) params.set('end-date', encodeURIComponent(endDate));
            if (city) params.set('City', encodeURIComponent(city));

            // router.push(`/rent-a-car`);
        } catch (error) {
            console.log('Error during redirection:', error);
        }

        localStorage.setItem('dateRange', JSON.stringify({ start: startDate, end: endDate }));
    };

    const getCars = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${searchLink}`, { timeMin: startDate, timeMax: endDate, location: city }, { headers: { 'Content-Type': 'application/json' } });
            console.log(response);
            localStorage.setItem('searchListData', JSON.stringify(response.data.cars));
        } catch (error) {
            console.log(`error fetching data ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-bar-wrapper">
            <div className="search-bar" id="search-bar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={startDate}
                        label="Početni datum"
                        disablePast
                        maxDate={maxDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        format='DD/MM/YYYY'
                        className='mui-input city'
                        name='date-picker-start'
                    />
                    <DatePicker
                        value={endDate}
                        label="Krajnji datum"
                        disablePast
                        maxDate={maxDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        format='DD/MM/YYYY'
                        className='mui-input city'
                        name='date-picker-end'
                        minDate={startDate || null}
                    />
                </LocalizationProvider>
                {/* <Autocomplete
                    value={city}
                    options={cities}
                    getOptionLabel={(option) => option}
                    onChange={(e, newValue) => setCity(newValue)}
                    renderInput={(params) => <TextField {...params} label="Izaberite grad" variant="outlined" />}
                    className='mui-input'
                /> */}
                <div onClick={handleSearch} className='search-bar-icon'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} color='black' size='1x' />
                </div>
            </div>
            {loading && <Box position={'absolute'} bottom={-25} sx={{ display: 'flex' }}>
                <CircularProgress color='#2D6A4F' />
            </Box>}
        </div>
    );
}
