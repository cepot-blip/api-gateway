import { response, request, query } from "express";
import { ModelsPaymentlogs } from "../../../models/Models";

export const ReadPaymentLogsById = async(req = request, res = response)=>{
    try {
        const { id } = await req.params
        const result = await ModelsPaymentlogs.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            query : result
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}