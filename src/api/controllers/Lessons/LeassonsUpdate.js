import { response, request } from "express";
import { ModelsLessons } from "../../../models/Models";

export const LeassonsUpdate = async(req = request, res = response)=>{
    try {
        const {
            id,
            name,
            video,
            chapter_id
        } = await req.body
        const checkUniqueId = await ModelsLessons.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueChapterId = await ModelsLessons.findFirst({
            where : {
                chapter_id : parseInt(chapter_id)
            }
        })

        if(!checkUniqueId){
            return res.status(400).json({
                success : false,
                msg : "Id not found!"
            })
        }

        if(!checkUniqueChapterId){
            return res.status(400).json({
                success : false,
                msg : "Chapter id not found!"
            })
        }

        await ModelsLessons.update({
            where : {
                id : parseInt(id)
            },
            data : {
                name : name,
                video : video,
                chapter_id : parseInt(chapter_id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update leassons!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error  :error.message
        })
    }
}