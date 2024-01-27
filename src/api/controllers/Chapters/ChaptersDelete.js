import { request, response } from "express";
import { ModelsChapters } from "../../../models/Models";

export const ChaptersDelete = async (req = request, res = response)=>{
    try {
        const {id} = await req.params
        const checkUniqueId = await ModelsChapters.findFirst({
            where :{
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(400).json({
                success : false,
                msg :"Id not found!"
            })
        }

        await ModelsChapters.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully delete chapters!"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}