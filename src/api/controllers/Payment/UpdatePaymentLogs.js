import { response, request } from "express";
import { ModelsPaymentlogs } from "../../../models/Models";

export const UpdatePaymentLogs = async(req = request, res = response)=>{
    try {
        const {
            id,
            status,
            payment_type,
            raw_response,
            order_id
        } = await req.body
        
        const checkUniqueId = await ModelsPaymentlogs.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueOrderId = await ModelsPaymentlogs.findFirst({
            where : {
                order_id : parseInt(order_id)
            }
        })

        if(!checkUniqueId){
            return res.status(400).json({
                success : false,
                msg : "Id not found!"
            })
        }

        if(checkUniqueOrderId){
            return res.status(400).json({
                success : false,
                msg : "Order id not found!"
            })
        }

        await ModelsPaymentlogs.update({
            where :{
                id : parseInt(id)
            },
            data : {
                id : parseInt(id),
                status : status,
                payment_type : payment_type,
                raw_response : raw_response,
                order_id : parseInt(order_id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update payment logs!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}