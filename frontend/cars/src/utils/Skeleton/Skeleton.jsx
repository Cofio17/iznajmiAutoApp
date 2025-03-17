import { Skeleton } from "@mui/material";
import './skeleton.scss'
export default function SkeletonCar() {
    return (
        <div className='container-car-skeleton'>
            <div>
                <Skeleton variant="text" sx={{ fontSize: '2rem', width: '200px' }} />
                <Skeleton variant="rectangular" width={'90vw'} height={'50vh'} />
            </div>
            <Skeleton variant="rounded" width={'300px'} height={'30vh'} />
        </div>
    );
}

export function SkeletonCalendar() {
    return (
        <Skeleton animation='pulse' variant="rounded" width={'400px'} height={'400px'} />
    );
}