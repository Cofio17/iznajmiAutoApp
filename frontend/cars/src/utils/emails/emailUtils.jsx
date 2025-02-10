import { renderToStaticMarkup } from "react-dom/server";
import ReservationEmail from "./ReservationEmail";
import { CancelEmail } from "./CancelEmail";

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

export const generateCanceEmailHtml = (name) => {
    const emailComponent = (
        <CancelEmail
            name={name} />
    )
    return renderToStaticMarkup(emailComponent)
}