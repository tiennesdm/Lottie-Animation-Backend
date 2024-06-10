const mongoose = require('mongoose');

module.exports.connection = async () => {
    try {        
        await mongoose.connect(process.env.MONGO_DB_URL || "mongodb+srv://tiennesdm:shubhammehta@lottie-api.g4jdpmc.mongodb.net");
        console.log('Database Connected Successfully');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports.isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}
