const mongoose = require('mongoose');
const {MONGODB_URL} = require('./default');

const connectDB= async () => {
    try {
         await mongoose.connect(MONGODB_URL, {
            // useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            // useUnifiedTopology: true

         })
         console.log(`Database connected..`)
    } catch (error) {
        console.error(error.message);
        process.exit(1)

    }
}

module.exports=connectDB;