const mongoose = require('mongoose');
const { Schema } = mongoose;

const carSchema = new Schema({
    licensePlate: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    type: { type: [String], required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    seats: { type: Number, required: true },
    doors: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    mileage: { type: Number, required: true },
    insuranceIncluded: { type: Boolean, default: false },
    deposit: { type: Number },
    location: { type: String, required: true },
    features: { type: [String], default: [] },
    image: { type: String },
    description: { type: String },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    calendarId: { type: String },
    images: { type: [String], required: true },
    trunkCapacity: { type: Number, required: true },
    enginePower: { type: Number, required: true },
});

const Car = mongoose.model('Car', carSchema);


module.exports = Car;
