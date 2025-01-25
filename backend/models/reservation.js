const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    licensePlate: { type: String, required: true },
    brand: { type: String },
    model: { type: String },
    pricePerDay: { type: Number },
    priceTotal: { type: Number },
    duration: { type: Number },
    buyer: { type: String },
    jmbg: { type: String },
    number: { type: String },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' }
}, { timestamps: true })

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;