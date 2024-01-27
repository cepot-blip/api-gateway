import { response, request } from "express";
import { ModelsLessons } from "../../../models/Models";

export const LeassonsDelete = async (req = request, res = response) =>{
    try {
        const { id } = await req.params
        const checkUniqueId = await ModelsLessons.findUnique({
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

        await ModelsLessons.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully delete leassons!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error  : error.message
        })
    }
}