const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { DB_HOST, PORT = 5000 } = process.env;

const app = require('./app');

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
    .then(() => app.listen(PORT, () => console.log(`Database connection port ${PORT} successful`)))
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    })