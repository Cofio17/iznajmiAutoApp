import { Table } from "./Table";
import "./tablewrapper.css";



export const TableWrapper = ({ data }) => {
    // Uzimamo prvi objekat iz data za generisanje kolona
    const excludeKeys = ["__v", "_id", "updatedAt", 'calendarId']; // Izuzmi neželjene ključeve

    // Proveri da li je data definisano i da li ima elemenata
    const columns = data && data.length > 0
        ? Object.keys(data[0])
            .filter((key) => !excludeKeys.includes(key))
            .map((key) => ({
                name: key,
                width: 100,
            }))
        : []; // Ako je data prazna, vraća prazan niz

    console.log(columns);

    return (
        <section className="page table-1-page">
            <div className="table-1-card">
                <div className="header">
                    <h2 >Rezervacije</h2>
                </div>
                {data && data.length > 0 ? (
                    <Table columns={columns} data={data} />
                ) : (
                    <p>Nema podataka za prikaz.</p> // Prikaz poruke ako nema podataka
                )}
            </div>
        </section>
    );
};


