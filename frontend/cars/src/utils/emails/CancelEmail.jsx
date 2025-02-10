
import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import dayjs from "dayjs";

export const CancelEmail = ({ name
}) => (

    <Html>
        <Head />
        <Preview>
            Uspešno ste otkazali auto
        </Preview>
        <Body style={main}>
            <Container style={container}>

                <Text style={paragraph}>Pozdrav, {name || 'Osobo'}</Text>
                <Text style={paragraph}>
                    Uspešno ste otkazali auto
                </Text>

                <Text style={paragraph}>
                    Srdačno
                    <br />
                    Iznajmi Me
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    Senćanski put 63, Subotica, 24000
                    iznajmi@info.com
                </Text>
            </Container>
        </Body>
    </Html>
);

export default CancelEmail;

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