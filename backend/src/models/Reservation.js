import mongoose from "mongoose";

const reservationSchema= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Restaurant",
    },
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Table",
    },
    date:{
        type:String,
        required: true,
    },
    timeslot:{
        type:String,
        required: true,
    },
    guests:{
        type:Number,
        required: true,
    },
    status:{
        type:String,
        enum:["Booked", "Cancelled"],
        default:"Booked",
    },
    },
{timestamps:true})

export default mongoose.model("Reservation", reservationSchema);