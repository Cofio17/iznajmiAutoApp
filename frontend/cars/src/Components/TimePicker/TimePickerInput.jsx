import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function TimePickerInput({ value, onChange, label }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                className="mui-time-picker"
                label={label}
                views={["hours", "minutes"]}
                value={value}
                onChange={onChange}
                ampm={false}

            />
        </LocalizationProvider>
    );
}
