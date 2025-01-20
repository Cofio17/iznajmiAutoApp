require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser')
const port = process.env.PORT;
//imported routes
const itemsRouter = require('./routes/itemsRoute.js');
const reservationsRouter = require('./routes/reservationsRoute.js');
const calendarRoute = require('./routes/calendar.js');
const companyRouter = require('./routes/companyRoute.js');
const emailRouter = require('./routes/email.js');
const auth = require('./routes/auth.js');

//connection to database
mongoose.connect(process.env.MONGO_URL)
    .then(() => app.listen(port, () => {
        console.log(`server is listening on: http://localhost:${port}`);

    }))
    .catch((err) => console.log(`failed connection to the db ${err}`)
    )


//middleware

app.use(cors({
    origin: 'http://192.168.0.17:5173',
    credentials: true
}));
app.use(express.json()); //needed so the server can receive json data in post request
app.use(cookieParser());


//routes
app.use(auth);
app.use('/cars', itemsRouter); //cars route - incomplete
app.use('/', reservationsRouter); //izbaciti
app.use("/api/calendar", calendarRoute); //calendar route
app.use('/company', companyRouter); // companies route
app.use('/email', emailRouter);

app.get('/', (req, res) => {
    res.send('home page');
})

