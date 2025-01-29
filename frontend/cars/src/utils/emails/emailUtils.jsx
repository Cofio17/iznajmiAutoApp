import { renderToStaticMarkup } from "react-dom/server";
import ReservationEmail from "./ReservationEmail";

export const generateReservationEmailHtml = (userFirstname, model, brand, reservationData) => {
    const emailComponent = (
        <ReservationEmail
            userFirstname={userFirstname}
            model={model}
            brand={brand}
            reservationData={reservationData}
        />
    );
    return renderToStaticMarkup(emailComponent);
};