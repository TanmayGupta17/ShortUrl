const mongoose = require('mongoose');
const { redirect } = require('react-router');

const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true
    },
    redirectUrl:{
        type: String,
        required: true
    },
    VisitHistory: [{
        timestamp : {type: Number}
    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
},
{
    timestamps: true
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
