import { LocalizationProvider, TimePicker, DesktopTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import './timePicker.scss'
export default function TimePickerInput({ value, onChange, label }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopTimePicker
                className="mui-time-picker"
                label={label}
                views={["hours", "minutes"]}
                value={value}
                onChange={onChange}
                ampm={false}
                minutesStep={15}


            />
        </LocalizationProvider>
    );
}
