import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import Restaurant from '../models/restaurantModel.js';

const placeOrder = async (req, res) =>
{
    try 
    {
        const {name, quantity, price} = req.body;
        const userId = req.userId; // id generated from auth middleware for cookie authorisation

        const user = await User.findOne({_id: userId});
        if(user)
        {
            const order = await Order.create({name, quantity, price});
            user.cart.push({order: order._id, quantity});
            await user.save();
            res.status(200).json({cart: user.cart});
        }
        else 
        {
            console.log("couldnt add order to the cart");
        }
    }
    catch (err)
    {   
        console.log("user not found", err);
    }
}

const rating = async (req, res) => 
{
    const userId = req.userId;
    const {restId, feedback, rating} = req.body;
    try 
    {
        const restaurant = await Restaurant.findById(restId);
        if(restaurant)
        {
            const existRating = restaurant.ratings.find((r) => 
            {
                return r.user.toString() === userId;
            });

            if(existRating)
            {
                existRating.rating = rating;
                existRating.feedback = feedback;
            }
            else restaurant.ratings.push({user: userId, rating, feedback});

            await restaurant.save();
            res.status(200).json({restaurant});
        }
    }
    catch (err)
    {
        console.log("couldnt add rating", err);
    }
    
}
export {placeOrder, rating};