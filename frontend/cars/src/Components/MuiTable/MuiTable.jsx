import { useState, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination,
} from "@mui/material";
import dayjs from "dayjs";
import LongMenu from "../DropDownMenu/DropDownMenuAdmin";
import { apiRequest } from "../../utils/Api/apiService";
import { generateCanceEmailHtml } from "../../utils/emails/emailUtils";
import DialogSelect from '../../utils/Dialog/Dialog';
import './table.scss'


const MuiTable = ({ reservations, setReservations }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [dialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);



    const options = [
        { label: 'Detaljnije', action: () => console.log('Detaljniji prikaz') },
        { label: 'Izmeni', action: () => handleOpenDialog() },
        { label: 'Otkaži', action: () => deleteReservationFromTable() },
    ];





    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const checkClickedRow = (e) => {
        const row = e.currentTarget; // Dohvata ceo <tr>
        const reservId = row.children[0].textContent.trim()
        setSelectedReservation(reservId);
        findCarByReservationId(reservId);
    };

    async function deleteReservationFromTable() {

        const confirmDelete = window.confirm("Da li ste sigurni da želite da otkažete ovu rezervaciju?");
        if (!confirmDelete) {
            return; // Ako korisnik nije potvrdio, izađi iz funkcije
        }
        const car = findCarByReservationId(selectedReservation);
        if (car) {
            await cancelAReservation(car);
            setReservations(prevReservations => prevReservations.filter(res => res.reservationId !== selectedReservation));
        } else {
            console.error("Nema automobila sa ID rezervacije:", selectedReservation);
        }
    }




    function findCarByReservationId(reservationId) {
        const selectedReservation = reservations.find(reservation => reservation.reservationId === reservationId);

        if (selectedReservation) {
            setSelectedCar(selectedReservation);

        } else {
            console.warn(`Reservation with ID ${reservationId} not found`);
        }

        return selectedReservation;
    }

    function handleOpenDialog() {
        setIsDialogOpen(true);
    }



    /**
     * On succesfull API call to Google Calendar, an HTML email is generated and sent to the user who made a reservation.
     */
    const sendEmail = async (car) => {
        const name = car.buyer;
        const emailContent = {
            to: car.email,
            subject: "Uspešno otkazivanje! Iznajmi.me",
            html: generateCanceEmailHtml(name, car)
        }

        try {
            const response = await apiRequest("POST", "email/send-email", emailContent);
            console.log("Email sent:", response);

        } catch (error) {
            console.error("Error sending email:", error);
        }


    };

    const cancelAReservation = async (car) => {
        try {
            const res = await apiRequest("DELETE", `api/calendar/cancel/${car.calendarId}/${car.eventId}`);
            console.log("Rezervacija otkazana:", res);
            await sendEmail(car);
        } catch (error) {
            console.error("Greška pri otkazivanju rezervacije:", error);
        }
    };

    return (
        <TableContainer component={Paper}>
            {selectedCar && <DialogSelect setReservations={setReservations} selectedCar={selectedCar} openProp={dialogOpen} onClose={() => setIsDialogOpen(false)} />}

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID rezervacije</TableCell>
                        <TableCell>Datum kreiranja</TableCell>
                        <TableCell>Početak</TableCell>
                        <TableCell>Kraj</TableCell>
                        <TableCell>Tablice</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Kupac</TableCell>
                        <TableCell>Broj telefona</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Ukupna Cena (€)</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reservation) => (
                        <TableRow onClick={checkClickedRow} key={reservation._id}>
                            <TableCell className="row">  <div className="menu-long"><LongMenu options={options} /></div> {reservation.reservationId}</TableCell>
                            <TableCell>{dayjs(reservation.createdAt).format("DD/MM/YYYY HH:mm")}</TableCell>
                            <TableCell>{dayjs(reservation.startDate).format("DD/MM/YYYY HH:mm")}</TableCell>
                            <TableCell>{dayjs(reservation.endDate).format("DD/MM/YYYY HH:mm")}</TableCell>
                            <TableCell>{reservation.licensePlate}</TableCell>
                            <TableCell>{reservation.brand} {reservation.model}</TableCell>
                            <TableCell sx={{ paddingRight: '30px' }}>{reservation.buyer}</TableCell>
                            <TableCell>{reservation.number}</TableCell>
                            <TableCell>{reservation.email}</TableCell>
                            <TableCell>{reservation.priceTotal} €</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={reservations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage='Broj redova na stranici'
            />
        </TableContainer>
    );
};

export default MuiTable;
