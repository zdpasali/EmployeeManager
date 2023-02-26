const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String,  required: true},
    picture: { type: String },
    sex: { type: String , required: true},
    dateOfBirth: { type: Date , required: true},
    dateOfWorkStart: { type: Date  },
    typeOfContract: { type: String , required: true},
    contractDuration: { type: String },
    department: { type: String , required: true},
    numberOfVacationDays: { type: Number },
    numberOfFreeDays: { type: Number },
    numberOfPaidLeaveDays: { type: Number }
  });


const Users = mongoose.model('User', userSchema);

module.exports = Users;