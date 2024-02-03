import { response, request } from "express";
import { ModelsPaymentlogs } from "../../../models/Models";

export const ReadPaymentLogs = async(req = request, res = response)=>{
    try {
        const {page = 1, limit = 10} = await req.query
        let skip =(page - 1) * limit
        const { filter } = await req.body
        const result = await ModelsPaymentlogs.findMany({
            skip : parseInt(skip),
            take : parseInt(limit),
            orderBy : {
                id : "desc"
            },
            where : filter
        })

        const cn = await ModelsPaymentlogs.count()

        res.status(200).json({
            success : true,
            curret_page : parseInt(page),
            total_page : Math.ceil(cn/limit),
            total_data : cn,
            query : result
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}