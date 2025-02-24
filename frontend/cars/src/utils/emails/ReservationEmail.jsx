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

export const ReservationEmail = ({
    userFirstname,
    brand,
    model,
    reservationData
}) => (
    <Html>
        <Head />
        <Preview>
            🎉 Vaša rezervacija je potvrđena!
        </Preview>
        <Body style={styles.body}>
            <Container style={styles.container}>
                <Text style={styles.greeting}>Pozdrav, {userFirstname || "Osoba"} {reservationData.summary.lastName}</Text>
                <Text style={styles.text}>
                    Hvala vam što ste odabrali iznajmi.me! Vaša rezervacija je uspešno potvrđena.
                    Detalji rezervacije su u nastavku:
                </Text>
                <Section style={styles.detailsSection}>
                    <Text style={styles.details}><strong>🚗 Vozilo:</strong> {brand || 'Brand'} {model || 'Model'}</Text>
                    <Text style={styles.details}><strong>💰 Ukupna cena:</strong> {reservationData.summary.priceTotal}€</Text>
                    <Text style={styles.details}><strong>📅 Početak:</strong> {dayjs(reservationData.start.dateTime).format('DD/MM/YYYY  HH:mm')}</Text>
                    <Text style={styles.details}><strong>⏳ Kraj:</strong> {dayjs(reservationData.end.dateTime).format('DD/MM/YYYY  HH:mm')}</Text>
                    <Text style={styles.details}><strong>📍 Lokacija:</strong> {reservationData.companyData.address}</Text>
                    <Text style={styles.details}><strong>🆔 ID rezervacije:</strong> {reservationData.reservationId}</Text>

                    <Text style={styles.details}><strong>🏢 Agencija:</strong> {reservationData.companyData.name}</Text>
                    <Text style={styles.details}><strong>📞 Kontakt broj:</strong> {reservationData.companyData.contact}</Text>
                </Section>
                <Text style={styles.text}>
                    Ako imate bilo kakvih pitanja, slobodno nas kontaktirajte.
                    Radujemo se vašoj vožnji!
                </Text>
                <Hr style={styles.hr} />
                <Text style={styles.footer}>
                    🚗 iznajmi.me | Senćanski put 63, Subotica, 24000 | iznajmi@info.com
                </Text>
            </Container>
        </Body>
    </Html>
);

export default ReservationEmail;

const styles = {
    body: {
        backgroundColor: "#f9f9f9",
        fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
        padding: "20px",
    },
    container: {
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    greeting: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    text: {
        fontSize: "16px",
        lineHeight: "24px",
        marginBottom: "15px",
    },
    detailsSection: {
        backgroundColor: "#f1f1f1",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "15px",
    },
    details: {
        fontSize: "16px",
        lineHeight: "24px",
    },
    hr: {
        borderColor: "#cccccc",
        margin: "20px 0",
    },
    footer: {
        color: "#8898aa",
        fontSize: "12px",
        textAlign: "center",
    }
};
