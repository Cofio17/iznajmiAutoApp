import { useState, useEffect } from "react";
import dayjs from "dayjs";
import TimePickerInput from "./TimePickerInput";
import { getHoursOfDate } from "../../utils/createDate";


export default function TimePickerManager({ onTimesChange, startDateHours = undefined, endDateHours = undefined }) {
    const [startHours, setStartHours] = useState(startDateHours ? getHoursOfDate(startDateHours) : dayjs().set("hour", 10).set("minute", 0));
    const [endHours, setEndHours] = useState(endDateHours ? getHoursOfDate(endDateHours) : dayjs().set("hour", 10).set("minute", 0));

    // console.log(`start ${getHoursOfDate(startDateHours)}`);
    // console.log(`end ${getHoursOfDate(endDateHours)}`);



    useEffect(() => {

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
