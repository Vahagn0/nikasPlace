let mongoose = require('mongoose');

let Schema = mongoose.Schema;

var Customer = new Schema(
    {
        name: {
            type: String,
            required : [ true, 'name name is required'],
         },
        surname: {
            type: String,
            required : [ true, 'surname name is required'],
        },
        phoneNumber: {
            type: String,
            required : [ true, 'ph number name is required'],
        },
        mail: {
            type: String,
            required : [ true, 'mail name is required'],
        },
        birthDate: {
            type: String,
            required : [ true, 'birth date is required'],
        },
        personalCode: {
            type: String,
            required : [ true, 'code is super required'],
        },
        currentAboniment: {
            type: String,
            required : [ true, 'aboniment is required'],
        },
        aboniments: {
            type: Array,
        },
        visitsLeft :
        {
            type: Number,
            default : 0,
            required : [ true, 'visits left is required'],
        },
        visits: {
            type: Array,
            required : [ true, 'visits is required'],
        },
    }, 
    {
        timestamps: true //adds created and updated time stamp to database.
    }
);

module.exports = mongoose.model('Customer', Customer);