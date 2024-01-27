import { response, request } from "express";
import { ModelsImageCourses } from "../../../models/Models";

export const ImageCoursesUpdate = async(req = request, res = response)=>{
    try {
        const {
            id,
            courses_id,
            image
        } = await req.body
        const checkUniqueId = await ModelsImageCourses.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueCoursesId = await ModelsImageCourses.findFirst({
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
                msg : "Courses id not found!"
            })
        }

        await ModelsImageCourses.update({
            where : {
                id : parseInt(id)
            },
            data : {
                courses_id : parseInt(id),
                image : image
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update image courses!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error :error.message
        })
    }
}