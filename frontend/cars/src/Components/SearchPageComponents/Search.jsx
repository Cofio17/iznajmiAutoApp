import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Autocomplete } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

import { SearchContext } from '../../Contexts/SearchContext';



/**
 * 
 * @returns Component that contains search bar and search with dates
 */
export default function Search() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const maxDate = dayjs().add(3, 'month');
    const [city, setCity] = useState(null);


    const location = useLocation();
    const navigate = useNavigate();

    const { searchListData, setSearchListData } = useContext(SearchContext);


    // const localhost = process.env.LOCAL_HOST;
    const searchLink = 'http://localhost:5000/api/calendar/search'

    const cities = [
        'Subotica',
        'Novi Sad',
        'Belgrade',
        'Kragujevac',
        'Niš',
    ];



    /**
     * redirecting to Cars Page and sending data through state
     */
    const handleSearch = async () => {
        try {
            await getCars();
            if (location.pathname === '/') {
                navigate('/cars', { state: searchListData });
            }
        } catch (error) {
            console.log('Error during redirection:', error);
        }

    }

    const getCars = async (e) => {

        try {
            const response = await axios.post(`${searchLink}`, { timeMin: startDate, timeMax: endDate }, { headers: { 'Content-Type': 'application/json' } });
            //Context API state managment
            setSearchListData(response.data.cars);

        } catch (error) {
            console.log(`error fetching data ${error}`);

        }
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
            <div onClick={handleSearch} className='search-bar-icon' >
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
