import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema({
    name: String,
    location: String,
    Opentime: String,
    Closingtime: String,
})

export default mongoose.model("Restaurant", restaurantSchema)