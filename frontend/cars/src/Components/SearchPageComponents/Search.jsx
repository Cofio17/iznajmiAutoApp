import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Autocomplete } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Contexts/SearchContext';
import LoadingCircle from '../../utils/LoadingCircle/LoadingCircle';


/**
 * 
 * @returns Component with Search Bar
 */
export default function Search() {

    const localhost = import.meta.env.VITE_LOCAL_HOST;
    const searchLink = `${localhost}api/calendar/search`


    const location = useLocation();
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const maxDate = dayjs().add(3, 'month');


    const cities = [
        'Subotica',
        'Novi Sad',
        'Beograd',
        'Zrenjanin',
    ];

    //search params for cities
    const searchParams = new URLSearchParams(location.search);
    const [city, setCity] = useState(null);
    const { loading, setLoading, setSearchListData, setFilterListData, setFiltersContext, setHasSearched, setMaxPrice } = useContext(SearchContext);

    const resetFilters = () => {
        setMaxPrice(200);
        setFilterListData([]);
        setFiltersContext([]);

    }

    useEffect(() => {
        const handleSearchParams = () => {
            if (location.pathname === '/rent-a-car') {
                //setting url params


                // getting from url params
                const startDateParam = searchParams.get('start-date');
                const endDateParam = searchParams.get('end-date');
                const cityParam = searchParams.get('City');

                // setting start date
                const startDate = startDateParam ? dayjs(decodeURIComponent(startDateParam)) : null;
                setStartDate(startDate);

                //setting end date
                const endDate = endDateParam ? dayjs(decodeURIComponent(endDateParam)) : null
                setEndDate(endDate);

                //setting city
                const city = cityParam ? decodeURIComponent(cityParam) : null;
                setCity(city);
            }
        };

        handleSearchParams();
    }, [location.pathname]);

    /**
     * / - redirecting to Cars Page and sending data throught url params
     * /cars - fetching available cars 
     */
    const handleSearch = async () => {
        resetFilters();
        setFilterListData([]);
        setSearchListData([]);
        const params = new URLSearchParams();
        try {
            await getCars();

            // Dodavanje parametara u URL
            if (startDate) params.set('start-date', encodeURIComponent(startDate));
            if (endDate) params.set('end-date', encodeURIComponent(endDate));
            if (city) params.set('City', encodeURIComponent(city));

            // Determine if has search should be true
            setHasSearched(true);
            // Postavljanje nove URL adrese
            const newPath = location.pathname === '/' ? '/rent-a-car' : location.pathname;
            navigate(`${newPath}?${params.toString()}`, { state: { city } });
        } catch (error) {
            console.log('Error during redirection:', error);
        }
        const dateRange = {
            start: startDate,
            end: endDate
        }
        localStorage.setItem('dateRange', JSON.stringify(dateRange));
    };

    const getCars = async (e) => {
        setLoading(true);
        try {

            const response = await axios.post(`${searchLink}`, { timeMin: startDate, timeMax: endDate, location: city }, { headers: { 'Content-Type': 'application/json' } });
            //Context API state managment
            setSearchListData(response.data.cars);

        } catch (error) {
            console.log(`error fetching data ${error}`);

        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="search-bar-wrapper">
            <div className="search-bar" id="search-bar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={startDate}
                        label="Početni datum"
                        disablePast={true}
                        maxDate={maxDate}
                        onChange={(newValue) => { setStartDate(newValue) }}
                        format='DD/MM/YYYY'
                        className='mui-input city'
                        name='date-picker-start'

                    />
                    <DatePicker
                        value={endDate}
                        label="Krajnji datum"
                        disablePast={true}
                        maxDate={maxDate}
                        onChange={(newValue) => { setEndDate(newValue) }}
                        format='DD/MM/YYYY'
                        className='mui-input city'
                        name='date-picker-end'
                        minDate={startDate || null}

                    />
                </LocalizationProvider>
                <Autocomplete
                    id='cityPickerInput'
                    value={city}
                    options={cities}
                    getOptionLabel={(option) => option}
                    onChange={(e, newValue) => {
                        setCity(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Izaberite grad" variant="outlined" />
                    )}
                    className='mui-input cityPickerInput'
                />
                <div onClick={handleSearch} className='search-bar-icon' >
                    <FontAwesomeIcon icon={faMagnifyingGlass} color='black' size='1x' />
                </div>

            </div>
            {loading && location.pathname === '/' && <LoadingCircle />}
        </div>

    );
}
