require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')


const app = express();
//middleware
app.use(express.json()); //needed so the server can receive json data in post request
app.use(cookieParser());



app.use(cors({
    origin: true,
    credentials: true,
    sameSite: 'lax'
}));


const port = process.env.PORT;
//imported routes
const itemsRouter = require('./routes/itemsRoute.js');
const reservationsRouter = require('./routes/reservationsRoute.js');
const calendarRoute = require('./routes/calendar.js');
const companyRouter = require('./routes/companyRoute.js');
const emailRouter = require('./routes/email.js');
const userRouter = require('./routes/userRoute.js');
const auth = require('./routes/auth.js');

//connection to database
mongoose.connect(process.env.MONGO_URL)
    .then(() => app.listen(port, () => {
        console.log(`server is listening on: http://localhost:${port}`);

    }))
    .catch((err) => console.log(`failed connection to the db ${err}`)
    )

//routes
app.use(auth);
app.use('/users', userRouter);
app.use('/cars', itemsRouter); //cars route
app.use('/reservations', reservationsRouter);
app.use("/api/calendar", calendarRoute); //calendar route
app.use('/company', companyRouter); // companies route
app.use('/email', emailRouter);


// // GET ruta za prikaz kolačića
// app.get('/get-cookies', (req, res) => {
//     const cookies = req.cookies; // Dobavljanje kolačića iz zahteva
//     console.log('Cookies:', cookies); // Štampanje kolačića u konzoli
//     res.json({ cookies }); // Slanje kolačića kao JSON odgovor
// });

app.get('/', (req, res) => {
    res.send('home page');
})

