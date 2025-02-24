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
import * as React from 'react';
import dayjs from "dayjs";

function pozdrav(ime) {
    const poslednjiKarakter = ime.charAt(ime.length - 1).toLowerCase();
    let pozdrav = "";
    if (poslednjiKarakter === 'a') {
        pozdrav = "Poštovana ";
    } else {
        pozdrav = "Poštovani ";
    }


    if ('aeiou'.includes(poslednjiKarakter)) {
        pozdrav += ime + "!";
    } else {
        pozdrav += ime + "e!";
    }

    return pozdrav;
}

export const UpdateReservationEmail = ({
    name = "Marko Petrović", // Dummy ime
    personData = {
        buyer: ("Filip"), // Dummy kupac
        brand: "Ford", // Dummy marka
        model: "Focus", // Dummy model
        priceTotal: 150, // Dummy ukupna cena
        startDate: new Date("2025-02-20T10:00:00"), // Dummy stari datum početka
        endDate: new Date("2025-02-25T10:00:00"), // Dummy stari datum kraja
        reservationId: "ABC123", // Dummy ID rezervacije
        companyId: {
            name: "Dummy Company",
            contact: "06123456",
            address: "Dummy address"
        }
    },
    newDates = {
        start: new Date("2025-02-22T10:00:00"), // novi datum
        end: new Date("2025-02-27T10:00:00"),   // novi datum
    },
}) => (
    <Html>
        <Head />
        <Preview>
            🎉 Vaša rezervacija je izmenjena!
        </Preview>
        <Body style={styles.body}>
            <Container style={styles.container}>

                <Text style={styles.greeting}> {pozdrav(personData.buyer)}</Text>

                <Text style={styles.text}>
                    Hvala Vam što ste odabrali iznajmi.me. Vaša rezervacija je uspešno promenjena.
                    Detalji nove rezervacije su u nastavku:
                </Text>
                <Section style={styles.detailsSection}>

                    <Text style={styles.details}> <strong>🚗 Vozilo:</strong>  {personData.brand} {personData.model}</Text>
                    <Text style={styles.details}><strong>💰 Ukupna cena:</strong> {personData.priceTotal}€</Text>

                    <Text style={styles.details}><strong>📅 Novi datum početka:</strong> <span style={styles.highlight}>{dayjs(newDates.start).format('DD/MM/YYYY  HH:mm')}</span></Text>
                    <Text style={styles.details}><strong>⏳ Novi datum kraja:</strong> <span style={styles.highlight}>{dayjs(newDates.end).format('DD/MM/YYYY  HH:mm')}</span></Text>

                    <Text style={styles.details}><strong>📅 Stari datum početka:</strong> <span style={styles.strikethrough}>{dayjs(personData.startDate).format('DD/MM/YYYY  HH:mm')}</span></Text>
                    <Text style={styles.details}><strong>⏳ Stari datum kraja:</strong> <span style={styles.strikethrough}>{dayjs(personData.endDate).format('DD/MM/YYYY  HH:mm')}</span></Text>
                    <Text style={styles.details}><strong>📍 Lokacija:</strong> {personData.companyId.address}</Text>
                    <Text style={styles.details}><strong>🆔 ID rezervacije:</strong> {personData.reservationId}</Text>
                    <Hr style={styles.hr} />
                    <Text style={styles.details}><strong>🏢 Agencija:</strong> {personData.companyId.name}</Text>
                    <Text style={styles.details}><strong>📞 Kontakt broj:</strong> {personData.companyId.contact}</Text>
                </Section>
                <Text style={styles.text}>
                    Vašom rezervacijom možete lako upravljati  putem našeg sajta.
                </Text>
                <Hr style={styles.hr} />
                <Text style={styles.footer}>
                    🚗 iznajmi.me | Senćanski put 63, Subotica, 24000 | iznajmi@info.com
                </Text>
            </Container>
        </Body>
    </Html>
);

export default UpdateReservationEmail;

const styles = {
    body: {
        backgroundColor: "#f9f9f9",
        fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
        padding: "20px",
    },
    container: {
        margin: "0 auto",
        padding: "5px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        maxWidth: "600px", // Maksimalna širina za veće ekrane
        width: "100%", // Širina za manje ekrane
        boxSizing: "border-box", // Osigurava da padding ne utiče na ukupnu širinu
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
        fontSize: "14px",
        lineHeight: "24px",
    },
    strikethrough: {
        textDecoration: "line-through",
        color: "#ff0000", // crvena boja za prekrizene datume
    },
    highlight: {
        fontWeight: "bold",
        color: "#008000", // zelena boja za nove datume
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
