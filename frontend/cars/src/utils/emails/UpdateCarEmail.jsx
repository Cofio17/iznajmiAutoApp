import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    Link
} from "@react-email/components";
import * as React from 'react';


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

const url = `https://www.iznajmi.me/rent-a-car/car/`;

export const UpdateCarEmail = ({
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
        },
        carLink: "http://192.168.0.17:5173/rent-a-car/car/BG123AB",
    },
    newDates = {
        start: new Date("2025-02-22T10:00:00"), // novi datum
        end: new Date("2025-02-27T10:00:00"),   // novi datum
    },
}) => (
    <Html>
        <Head />
        <Preview>
            Vaša rezervacija je izmenjena!
        </Preview>
        <Body style={styles.body}>
            <Container style={styles.container}>

                <Text style={styles.greeting}> {pozdrav(personData.buyer)}</Text>

                <Text style={styles.text}>
                    Zbog nepredviđene situacije, rezervisano vozilo neće biti dostupno za Vas, međutim obezbedili smo Vam vozilo iste ili bolje kategorije.
                </Text>
                <Section style={styles.detailsSection}>
                    <Text>
                        Vaše novo vozilo: {personData.brand} {personData.model}
                    </Text>

                    <Text>Novo vozilo možete pogledati na ovom  <Link
                        href={`${url}${personData.licensePlate}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007bff", textDecoration: "underline" }}
                    >
                        linku
                    </Link>
                    </Text>
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

export default UpdateCarEmail;

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
