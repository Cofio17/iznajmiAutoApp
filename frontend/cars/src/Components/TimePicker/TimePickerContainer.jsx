import { useState } from "react";

export default function TimePickerContainer({ children }) {
    const [startHours, setStartHours] = useState();
    const [endHours, setEndHourds] = useState();
    return (
        <div className="time-pickers-container">
            {children}
        </div>
    )
}