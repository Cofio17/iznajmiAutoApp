require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT;
//imported routes
const itemsRouter = require('./routes/itemsRoute.js');
const reservationsRouter = require('./routes/reservationsRoute.js');
const calendarRoute = require('./routes/calendar.js');
const companyRouter = require('./routes/companyRoute.js');
const emailRouter = require('./routes/email.js');

//connection to database
mongoose.connect(process.env.MONGO_URL)
    .then(() => app.listen(port, () => {
        console.log(`server is listening on: http://localhost:${port}`);

    }))
    .catch((err) => console.log(`failed connection to the db ${err}`)
    )


//middleware
app.use(cors());
app.use(express.json()); //needed so the server can receive json data in post request


//routes
app.use('/cars', itemsRouter); //cars route - incomplete
app.use('/', reservationsRouter); //izbaciti
app.use("/api/calendar", calendarRoute); //calendar route
app.use('/company', companyRouter); // companies route
app.use('/email', emailRouter);

app.get('/', (req, res) => {
    res.send('home page');
})

