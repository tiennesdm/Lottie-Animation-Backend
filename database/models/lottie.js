const mongoose = require('mongoose');

const lottieSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    isValidLottie: {
        type: Boolean
    },
    mimetype:{
        type: String, 
    },
    encoding:{
        type: String,
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model('Lottie', lottieSchema);