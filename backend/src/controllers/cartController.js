import Cart from "../models/Cart.js"


//controller function to add to cart it first checks if a cart with the userId in request exists if not then makes a cart with for that userId and fills the attributes with the necessary data if cart already exists then it checks whether the food item (items.foodId) already exists in the cart or not and then if it doesnt then adds that item with all the attributes into the cart if the item already exists then updates it's quantity and finally updates the total_Price by adding the price of each item again and again borderline it handles every request essentially 


export const addToCart = async (req, res) => {
    const userId = req.userId;
    const { restaurantId, foodId, name, price } = req.body


    try {
        let cart = await Cart.findOne({userId})

        if(!cart){
            cart = new Cart({
                userId,
                restaurantId,
                items : [{foodId, name, price, quantity:1}],
                totalPrice: price
            }
        )
        }
        else{
            const ItemIndex = cart.items.findIndex(
                item => item.foodId.toString() === foodId
            )

            if(ItemIndex>-1){
                cart.items[ItemIndex].quantity += 1

            }
            else{
                cart.items.push({foodId, name, price, quantity:1})
            }
            cart.totalPrice += price

        }
        await cart.save()
        res.status(200).json(cart)
        
        
    } catch (error) {
        res.status(500).json({"Error Message:": error.message})
        
    } 
}


//remove from cart

export const removeFromCart = async (req, res) => {
    const {userId, foodId} = req.body


    try {
        const cart = await Cart.findOne({userId})
        if(!cart) {return res.status(404).json({message:"Cart not found!"})}

        const ItemIndex = cart.items.findIndex(
            item => items.foodId.equals(foodId)
        )

        if(ItemIndex === -1 ){
            return res.status(404).json({message:"Food Item not found!"})
        }

        const item = cart.items[ItemIndex]


        if(item.quantity > 1){
            item.quantity -= 1
            cart.totalPrice -= item.price
            cart.items.splice(ItemIndex,1)
        }
        await cart.save()
        res.status(200).json(cart)
        
    } 

    catch (error) {
        res.status(500).json({"Error Message:":error.message})
    }
    
}

//get cart 

export const getCart = async (req, res) => {
    const {userId} = req.params

    try {
        const cart = await Cart.findOne({userId})
        res.status(200).json(cart) 
    } catch (error) {
        res.status(500).json({error: error.message})   
    } 
}

