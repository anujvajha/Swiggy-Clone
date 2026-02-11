import express from 'express'
 import{
    createReservation,
    getUserReservation,
    cancelReservation
 } from '../controllers/reservationController.js'

 const router = express.Router();


 router.post("/book", createReservation);
 router.post("/cancel/:reservationId", cancelReservation)
 router.get("/user/:userId", getUserReservation)

 export default router;