import {Alert} from '@mui/material'
export default function AlertBox ({text, severity}){
/**
 * Severity:
 * error
 * info
 * success
 * warning
 */
return(
    <Alert className='fit-content' severity={severity} >{text}</Alert>
)
}