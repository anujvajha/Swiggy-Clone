import express from 'express'

import { addToCart,removeFromCart, getCart } from '../controllers/cartController.js'

const router = express.Router()

router.post("/add", addToCart)
router.post("/remove", removeFromCart) //It should be DELETE in REST theory, but many projects use POST because DELETE bodies are unreliable and cart removal is often more than a simple delete.
router.get("/:userId", getCart)

export default router
