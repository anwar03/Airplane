const mongoose = require('mongoose');

var Airplane = new mongoose.Schema({
    title:{
        type: String,
        required : [ true, 'Title field is required']
    },
    shortLink:{
        type: String,
        required: [true, 'Short Link field is required']
    },
    destination:{
        type: String,
        required: [true, 'destination field is required']
    },
    createDate:{
        type: Date,
        default: Date.now
    },
    redirect:{
        type: Number,
        default: 0
    },
    status: {
        type:[{
            type: String,
            enum: ['Pending', 'Ongoing', 'Completed']
        }],
        default:['Pending']
    }
});


module.exports = mongoose.model('airPlane', Airplane);
