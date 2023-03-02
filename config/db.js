 const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://timmy:hazel@cluster0.qnd828z.mongodb.net/?retryWrites=true&w=majority', {
            useNEWurlparser: true,
            useunifiedTopology: true,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB
