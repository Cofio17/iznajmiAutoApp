import { renderToStaticMarkup } from "react-dom/server";
import ReservationEmail from "./ReservationEmail";
import { CancelEmail } from "./CancelEmail";
import UpdateReservationEmail from "./UpdateReservationEmail";

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

export const generateCanceEmailHtml = (name, personData) => {
    const emailComponent = (
        <CancelEmail
            name={name}
            personData={personData} />
    )
    return renderToStaticMarkup(emailComponent)
}

export const generateUpdateReservationEmail = (name, personData, newDates) => {
    const emailComponent = (
        <UpdateReservationEmail
            name={name}
            personData={personData}
            newDates={newDates} />
    )
    return renderToStaticMarkup(emailComponent)
}