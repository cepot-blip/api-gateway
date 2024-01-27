import { response, request } from "express";
import { ModelsPaymentlogs } from "../../../models/Models";

export const CreatePaymentLogs = async(req = request, res = response)=>{
    try {
        const {
            status,
            payment_type,
            raw_response,
            order_id
        } = await req.body

        const checkUniqueOrderId = await ModelsPaymentlogs.findFirst({
            where : {
                order_id : parseInt(order_id)
            }
        })

        if(checkUniqueOrderId){
            return res.status(400).json({
                success : false,
                msg : "Order id not found!"
            })
        }

        await ModelsPaymentlogs.create({
            data : {
                status : status,
                payment_type : payment_type,
                raw_response :raw_response
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create payment logs!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}