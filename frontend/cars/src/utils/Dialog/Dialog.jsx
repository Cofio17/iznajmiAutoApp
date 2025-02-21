import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from '@mui/material';
import './dialog.scss';
import { apiRequest } from '../Api/apiService';

const DialogSelect = ({ openProp, onClose, selectedCar }) => {
    const [open, setOpen] = useState(openProp);
    const [selectedOption, setSelectedOption] = useState('');
    const [freeCars, setFreeCars] = useState([]);

    useEffect(() => {
        setOpen(openProp);
    }, [openProp]);

    useEffect(() => {
        if (open) {

            const loadFreeCars = async () => {

                const dataTime = {
                    timeMin: selectedCar.startDate,
                    timeMax: selectedCar.endDate,
                    companyId: "6743593c11b9b757fa23d8e4"
                }
                const response = await apiRequest("POST", `/api/calendar/search`, dataTime);
                setFreeCars(response.cars)
                console.log(response.cars);
            }

            loadFreeCars();
        }

    }, [open])


    const handleClose = () => {
        setOpen(false);
        setSelectedOption('');
        if (onClose) onClose();
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        console.log(event.target.value);

    };

    const handleConfirm = () => {
        console.log('Selected option:', selectedOption);
        handleClose();
    };

    return (
        <Dialog className='dialog' open={open} onClose={handleClose}>
            <DialogTitle>Izaberite zamenu {selectedCar.brand}</DialogTitle>
            <DialogContent>
                <Select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    fullWidth
                >

                    {freeCars.map((car) => {
                        return <MenuItem key={car.licensePlate} value={car}>{car.brand} {car.model}</MenuItem>
                    })}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Otkaži
                </Button>
                <Button onClick={handleConfirm}>
                    Potvrdi
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogSelect;
