import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema
(
    {
        restaurant:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'restaurant',
            required: true
        },
        name : 
        {
            type: String, 
            required: true
        },
        quantity: 
        {
            type: Number,
            min: 1,
            default: 1,
            required: true
        },
        price:
        {
            type: Number,
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

export default mongoose.model('order', orderSchema);
