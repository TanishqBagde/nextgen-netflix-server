const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path:"../.env"
})

const dataBaseConnection = () => {
    mongoose.connect('mongodb+srv://tanishq:netflix123@cluster.9l6c9jf.mongodb.net/').then(() => {
        console.log("mongoDB connected Succussfully");
    })
    .catch((err) => {
        console.log(err);
    })
};
module.exports = dataBaseConnection;