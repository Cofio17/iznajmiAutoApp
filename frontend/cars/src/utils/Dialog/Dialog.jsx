import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from '@mui/material';
import './dialog.scss';
import { apiRequest } from '../Api/apiService';
import { sendEmailHelper } from '../emails/sendEmail';
import { generateUpdateCarEmail } from '../emails/emailUtils';


const DialogSelect = ({ openProp, onClose, selectedCar, setReservations }) => {
    const [open, setOpen] = useState(openProp);
    const [selectedOption, setSelectedOption] = useState('');
    const [freeCars, setFreeCars] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setOpen(openProp);
    }, [openProp]);

    useEffect(() => {
        if (open) {
            const loadFreeCars = async () => {
                //TO DO - change company id
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

    /**
     * Selected Car - car that has been clicked before drop down menu
     * Selected option - car that has been selected in the free cars drop down menu
     */
    const handleConfirm = async () => {
        console.log('Selected option:', selectedOption);
        setLoading(true);
        try {
            const response = await apiRequest("POST", `api/calendar/move/${selectedCar.calendarId}/${selectedCar.eventId}/${selectedOption.calendarId}`, selectedOption);
            console.log(response.data.updatedReservation);
            updateReservationInTable(response.data.updatedReservation);
            await sendEmail();

        } catch (error) {
            console.log(`Error while changing cars ${error}`)
        }
        finally {
            setLoading(false);
            handleClose();
        }
    };

    const sendEmail = async () => {

        const personData = {
            email: selectedCar.email,
            buyer: selectedCar.buyer,
            licensePlate: selectedOption.licensePlate,
            brand: selectedOption.brand,
            model: selectedOption.model
        }
        console.log(personData);

        const email = await sendEmailHelper(generateUpdateCarEmail, personData, "Vaša rezervacija je uspešno izmenjenja");
        console.log(`email : ${email}`);

    };

    const updateReservationInTable = (updatedReservation) => {
        setReservations(prevReservations =>
            prevReservations.map(res =>
                res.reservationId === updatedReservation.reservationId ? updatedReservation : res
            )
        );
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
                <Button disabled={loading} className={loading ? 'disabled' : ''} onClick={handleConfirm}>
                    {loading ? 'Ažuriranje' : 'Potvrdi'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogSelect;
