const mongoose = require('mongoose');


async function connectToMongodb(Url){
    mongoose.connect(Url);
}


module.exports = {connectToMongodb}