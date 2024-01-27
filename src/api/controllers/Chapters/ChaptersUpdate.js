import { request, response } from "express";
import { ModelsChapters } from "../../../models/Models";

export const ChaptersUpdate = async (req = request, res = response)=>{
    try {
        const {
            id,
            name,
            courses_id
        } = await req.body
        const checkUniqueId = await ModelsChapters.findFirst({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueCoursesId = await ModelsChapters.findFirst({
            where : {
                courses_id : parseInt(courses_id)
            }
        })

        if(!checkUniqueId){
            return res.status(400).json({
                success : false,
                msg : "Id not found!"
            })
        }

        if(!checkUniqueCoursesId){
            return res.status(400).json({
                success : false,
                msg :"Courses id not found!"
            })
        }

        await ModelsChapters.update({
            where : {
                id : parseInt(id)
            },
            data : {
                id : parseInt(id),
                courses_id : parseInt(courses_id),
                name : name
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update chapters!"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}