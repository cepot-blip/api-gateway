import { response, request, query } from "express";
import { ModelsOrders } from "../../../models/Models";

export const ReadOrderById = async (req = request, res = response) =>{
    try {
        const { id } = await req.params
        const result = await ModelsOrders.findUnique({
            where : {
                id : parseInt(id)
            },
            include : {
                Payment_logs : {
                    select : {
                        id : true,
                        status : true,
                        payment_type : true,
                        raw_response : true,
                        order_id : true
                    }
                }
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