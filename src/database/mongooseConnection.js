<<<<<<< HEAD
const mongoose = require("mongoose");

const connectDb = async () => {
    try{
        const connect = await mongoose.connect("mongodb+srv://game:game123@precipitation.sfuow.mongodb.net/Game?retryWrites=true&w=majority&appName=Precipitation");
        console.log("Database is connected to:",connect.connection.name);
    } catch (err) {
        console.log("Unable to connect database due to Error :",err);
        throw new(err)
    }

}

// mongodb+srv://tejaswini22:Teja2212@precipitationgame.8k8y4.mongodb.net/Game?retryWrites=true&w=majority&appName=precipitationgame


//mongodb://127.0.0.1:27017/Game

//`mongodb+srv://tejaswini22:Teja2212@precipitationgame.8k8y4.mongodb.net/Game?retryWrites=true&w=majority&appName=precipitationgame`

module.exports = connectDb ;

=======
const mongoose = require("mongoose");

const connectDb = async () => {
    try{
        const connect = await mongoose.connect("mongodb+srv://game:game123@precipitation.sfuow.mongodb.net/Game?retryWrites=true&w=majority&appName=Precipitation");
        console.log("Database is connected to:",connect.connection.name);
    } catch (err) {
        console.log("Unable to connect database due to Error :",err);
        throw new(err)
    }

}

// mongodb+srv://tejaswini22:Teja2212@precipitationgame.8k8y4.mongodb.net/Game?retryWrites=true&w=majority&appName=precipitationgame


//mongodb://127.0.0.1:27017/Game

//`mongodb+srv://tejaswini22:Teja2212@precipitationgame.8k8y4.mongodb.net/Game?retryWrites=true&w=majority&appName=precipitationgame`

module.exports = connectDb ;

>>>>>>> 089763f2c800b1537d4e03a1052f698eb45d58b4
// mongodb+srv://tejaswini22:Teja2212@precipitationgame.8k8y4.mongodb.net/?retryWrites=true&w=majority&appName=precipitationgame