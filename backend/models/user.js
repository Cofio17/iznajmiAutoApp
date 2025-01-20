const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'agency'], default: 'user' },
    agency: {
        type: Schema.Types.ObjectId, ref: 'Agency', required: function () {
            return this.role === 'agency';
        }
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
