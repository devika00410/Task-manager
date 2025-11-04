const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected to taskmanager_db')
        
        console.log('Database name:', mongoose.connection.db.databaseName)
    } catch(error) {
        console.log("Database connection error:", error)
        process.exit(1)
    }
}

module.exports = connectDB