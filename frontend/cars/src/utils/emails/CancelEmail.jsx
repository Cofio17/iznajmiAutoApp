
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


export const CancelEmail = ({ name, personData
}) => (

    <Html>
        <Head>
            <title>🚗 Vaša rezervacija je otkazana</title>
        </Head>
        <Body style={styles.body}>
            <Container style={styles.container}>
                <Section>
                    <Text style={styles.greeting}>Pozdrav {personData.buyer || "Person"},</Text>
                    <Text style={styles.header}>Žao nam je što vas nećemo videti ovaj put, ali vaša rezervacija je uspešno otkazana.</Text>
                    <Text style={styles.details}><strong>Vozilo:</strong> {personData.brand} {personData.model}</Text>
                    <Text style={styles.details}><strong>Bilo zakazano za:</strong>{dayjs(personData.startDate).format("DD/MM/YYYY")}-{dayjs(personData.endDate).format("DD/MM/YYYY")} </Text>
                    <Text style={styles.text}>
                        Razumemo da se planovi menjaju. Zato, ako se odlučite za novu rezervaciju, javite nam se što pre!
                    </Text>
                    <Text style={styles.footer}>Nadamo se da ćemo sarađivati nekom drugom prilikom!</Text>
                    <Text style={styles.company}>Iznajmi.me</Text>
                </Section>
                <Hr style={styles.hr} />
                <Section style={styles.footerSection}>
                    <Text style={styles.footerText}>
                        © {new Date().getFullYear()} Iznajmi.me. Sva prava zadržana.
                        <br />
                        Kontaktirajte nas na <a href="mailto:info@iznajmi.me">info@iznajmi.me</a>
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default CancelEmail;

const styles = {
    body: { backgroundColor: '#f4f4f4', padding: '20px', fontFamily: 'Arial, sans-serif' },
    greeting: { fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' },
    container: { backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
    header: { fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' },
    details: { fontSize: '16px', marginBottom: '5px' },
    text: { fontSize: '14px', margin: '15px 0' },
    footer: { fontSize: '14px', fontStyle: 'italic' },
    company: { color: '#2D6A4F', fontSize: '16px', fontWeight: 'bold', marginTop: '20px' },
    hr: { border: 'none', borderTop: '1px solid #ddd', margin: '20px 0' },
    footerSection: { textAlign: 'center', padding: '10px 0' },
    footerText: { fontSize: '12px', color: '#777' }
};