const mongoose=require("mongoose");
const dotenv=require('dotenv')


dotenv.config()




const connectToMongoDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Connected to mongodb")
    }
    catch(error){
        console.log("error connecting to database",error.message)
    }
}


module.exports=connectToMongoDB