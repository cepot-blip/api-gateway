import { response, request } from "express";
import { ModelsChapters } from "../../../models/Models";

export const ChaptersCreate = async(req = request, res = response)=>{
    try {
        const {
            name,
            courses_id
        } = await req.body
        await ModelsChapters.create({
            data : {
                name : name,
                courses_id : parseInt(courses_id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create chapters!"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}