
import {

    Body,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";


export const ReservationEmail = ({
    userFirstname,
    brand,
    model,
    reservationData


}) => (

    <Html>
        <Head />
        <Preview>
            Uspešno ste rezervisali Vaš auto
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src="https://i.imgur.com/L04IlJ8.png"
                    width="170"
                    height="50"
                    alt="logo"
                    style={logo}
                />
                <Text style={paragraph}>Hi {userFirstname || "Osoba"} {reservationData.summary.lastName},</Text>
                <Text style={paragraph}>
                    Uspešno ste rezervisali Vaš automobil {brand || 'Brand'} {model || 'Model'}
                </Text>
                <Text>
                    Cena: {reservationData.summary.priceTotal}e
                </Text>
                <Text>
                    Početak: {reservationData.start.dateTime}
                    Kraj :{reservationData.end.dateTime}

                </Text>
                <Text style={paragraph}>
                    ID vaše rezervacije je:{reservationData.reservationId}

                </Text>

                <Section style={btnContainer}>

                </Section>
                <Text style={paragraph}>
                    Srdačno
                    <br />
                    Iznajmi Me
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    Ulica Novosadskog Sajma 714, Beograd
                    iznajmi@info.com
                </Text>
            </Container>
        </Body>
    </Html>
);

export default ReservationEmail;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    textAlign: "center",
};
const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};