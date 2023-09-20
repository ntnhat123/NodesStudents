import mongoose from "mongoose";
import  Print  from "../helper/print.js";
import Exception from "../exceptions/Exceptions.js";
async function connect() {
    try {
        let connecting =  await mongoose.connect(process.env.MONGO_URL)
        Print.success("Connect to database success")
        return connecting
    } catch (error) {
        debugger
        if(error.code == 8000){
            throw new Exception(Exception.WrongPassword)
        }else if(error.code == 'ENOTFOUND'){
            throw new Exception(Exception.UserNotFound)
        }

        throw new Error("Cannot connect to database")
    }
}
export default connect

