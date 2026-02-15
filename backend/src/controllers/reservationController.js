import Reservation from "../models/Reservation.js";
import Table from "../models/Table.js"

export const createReservation = async(req, res)=>{
    const{userId, restaurantId, date, timeslot, guests} = req.body;
    try {
        const tables = await Table.find({
            restaurantId,
            capacity : {$gte: guests}
        })

        for(let table of tables){
            const reserved = await Reservation.findOne({
                tableId: table._id,
                data,
                timeslot,
                status:"Booked"
            })
            if(!reserved){
                const reservation = new Reservation({
                    userId,
                    restaurantId,
                    tableId,
                    date,
                    timeslot,
                    guests,
                })

                await reservation.save();
                return res.status(201).json(reservation);
            }
        }
        return res.status(400).json({message: "No tables available"})
   
    } catch (error) {
        return res.status(500).json({error:error.message});
        
    }
}

export const cancelReservation = async (req, res) => {
const {reservationId} = req.body;
try {
    const reservation = await Reservation.findById(reservationId);
    if(!reservation){
        return res.status(404).json({message:"Reservation not found!"})
    }
    reservation.status = "Cancelled";
    await reservation.save();

    res.status(200).json({message:"Reservation cancelled successfully!"});

 
} catch (error) {
    res.status(500).json({error: error.message})
    
}
}

export const getUserReservation = async (req, res) => {
    const {userId} = req.params;
    try {
        const reservations = await Reservation.findOne({userId})
        res.status(200).json(reservations)

        
    } catch (error) {
        res.status(500).json({error: error.message})
        
    }


    
}