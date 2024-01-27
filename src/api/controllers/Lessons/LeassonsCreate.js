import { response, request } from "express";
import { ModelsLessons } from "../../../models/Models";

export const LeassonsCreate = async(req = request, res = response)=>{
    try {
        const {
            name,
            video,
            chapter_id
        } = await req.body
        const checkUniqueChapterId = await ModelsLessons.findFirst({
            where : {
                chapter_id : parseInt(chapter_id)
            }
        })

        if(checkUniqueChapterId){
            return res.status(400).json({
                success : false,
                msg : "Chapter id not found!"
            })
        }

        await ModelsLessons.create({
            data : {
                name : name,
                video : video,
                chapter_id : parseInt(chapter_id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create leassons!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}