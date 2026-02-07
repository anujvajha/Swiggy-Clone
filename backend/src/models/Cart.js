import mongoose, { mongo } from "mongoose";

const cartItem = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name : String,
    price : Number,
    quantity:{
        type: Number,
        default : 0
    }
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    items: [cartItem],
    totalPrice: {
        type: Number,
        default: 0
    }
})

export default mongoose.model("Cart", cartSchema);