const mongoose = require('mongoose');

const Connection = async () => {
    const URL = `mongodb+srv://ihtisham:Ihtisham11@cluster0.wycltrp.mongodb.net/test`
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database connected succesfully')
    } catch (error) {
        console.log('Error from connection', error.message)
    }
}

module.exports = Connection;
