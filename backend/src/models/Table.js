import mongoose from "mongoose";
import Restaurant from "./Restaurant.js";


const tableSchema = new mongoose.Schema({
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required:true,
    },
    capacity:{
        type: Number,
        required: true,

    }

})

export default mongoose.model("Table", tableSchema)