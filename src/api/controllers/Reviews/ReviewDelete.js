import { response, request } from "express";
import { ModelsReviews } from "../../../models/Models";

export const ReviewDelete = async(req = request, res = response) =>{
    try {
        const { id } = await req.params
        const checkUniqueId = await ModelsReviews.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(400).json({
                success : false,
                msg : "Id not found!"
            })
        }

        await ModelsReviews.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create reviews!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}