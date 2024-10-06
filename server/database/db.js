import mongoose from "mongoose"

export const Connection = async (username, password) => {
    const url = `mongodb+srv://${username}:${password}@cluster0.qwsxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    try {
        await mongoose.connect(url, { useNewUrlParser: true });
        console.log("Connected to MongoDB");
    }
    catch (error){
        console.log('Error while connecting with the database ', error)
    }
}

export default Connection;