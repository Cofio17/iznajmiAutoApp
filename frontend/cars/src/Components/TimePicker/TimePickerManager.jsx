import { useState, useEffect } from "react";
import dayjs from "dayjs";
import TimePickerInput from "./TimePickerInput";

export default function TimePickerManager({ onTimesChange }) {
    const [startHours, setStartHours] = useState(dayjs().set("hour", 10).set("minute", 0));
    const [endHours, setEndHours] = useState(dayjs().set("hour", 10).set("minute", 0));


    useEffect(() => {
        console.log(startHours);

        onTimesChange({ startHours, endHours });
    }, [startHours, endHours,]);

    const handleTimesChange = () => {
        onTimesChange({ startHours, endHours });
    };

    return (
        <div className="time-pickers-container">
            <TimePickerInput
                label="Vreme preuzimanja"
                value={startHours}
                onChange={(value) => {
                    setStartHours(value);
                    handleTimesChange();
                }}
            />
            <TimePickerInput
                label="Vreme vraćanja"
                value={endHours}
                onChange={(value) => {
                    setEndHours(value);
                    handleTimesChange();
                }}
            />
        </div>
    );
}
