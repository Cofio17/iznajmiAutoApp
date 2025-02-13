import dayjs from "dayjs";
import CopyToClipboard from "../../Components/CopyToClipboard/CopyToClipboard";
import { Tooltip } from "@mui/material";
import { useState } from "react";
const excludeKeys = ["__v", "_id", "updatedAt", "calendarId", "jmbg", "email", "number", "eventId", "reservationId", "companyId", "createdAt", 'licensePlate'];
export default function ReservationInfoList({ data }) {
    //TO DO - prepraviti bazu da se dodaje tamo 2h da ne mora ovde
    const [copied, setCopied] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const handleCopyChange = (copy) => {
        setCopied(copy);
    }


    const keyMappings = {
        startDate: "Početni datum",
        endDate: "Krajnji datum",
        model: "Model",
        brand: "Brend",
        priceTotal: "Ukupna Cena(€)",
        duration: 'Trajanje u danima',
        buyer: 'Kupac',
        pricePerDay: 'Cena po danu(€)',
        licensePlate: "Registracija",
        companyContact: "Kontakt Izdavača"
    };
    return (
        <table className="reservation-info-table">

            <tbody>
                {Object.keys(data)
                    .filter((key) => !excludeKeys.includes(key))
                    .map((key) => {
                        const value = key.includes("Date")
                            ? dayjs(data[key]).add(2, "hours").format("DD/MM/YYYY HH:mm")
                            : data[key];

                        return (
                            <tr key={key} className="reservation-info-row">
                                <td className="primary-color">
                                    {keyMappings[key] || key}:
                                </td>
                                <td className="bold">
                                    {value}
                                    {key === "companyContact" && (
                                        <Tooltip title={copied ? "Copied!" : "Copy"} arrow>
                                            <span>
                                                <CopyToClipboard handleCopyChange={handleCopyChange} text={data.companyContact} />
                                            </span>
                                        </Tooltip>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}
