const MONGO_URI = "mongodb+srv://tapiwakundi:Tapiwa11@intuition.oxkcs.mongodb.net/intuition?retryWrites=true&w=majority"
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err.message);
        process.exit(1)
    }
}

module.exports = connectDB