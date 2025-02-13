import React, { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination,
} from "@mui/material";

const MuiTable = ({ reservations }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Početak</TableCell>
                        <TableCell>Kraj</TableCell>
                        <TableCell>Tablice</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Kupac</TableCell>
                        <TableCell>Ukupna Cena (€)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reservation) => (
                        <TableRow key={reservation._id}>
                            <TableCell>{new Date(reservation.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(reservation.endDate).toLocaleDateString()}</TableCell>
                            <TableCell>{reservation.licensePlate}</TableCell>
                            <TableCell>{reservation.brand} {reservation.model}</TableCell>
                            <TableCell>{reservation.buyer}</TableCell>
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
            />
        </TableContainer>
    );
};

export default MuiTable;
