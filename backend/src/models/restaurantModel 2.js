import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        cuisine:
        {
            type: String, 
            required: true
        },
        ratings:
        [
            {
                user :
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                    required: true
                },
                rating:
                {
                    type: Number,
                },
                feedback: 
                {
                    type: String
                }
            }
        ],
        
    },
    {
        timestamps: true
    }
);

export default mongoose.model('restaurant', restaurantSchema);