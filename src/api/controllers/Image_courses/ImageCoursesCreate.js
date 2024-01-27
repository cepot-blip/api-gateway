import { request, response } from "express";
import { ModelsImageCourses } from "../../../models/Models";

export const ImageCoursesCreate = async(req = request, res = response)=>{
    try {
        const {
            image,
            courses_id
        } = await req.body
        const checkUniqueCoursesId = await ModelsImageCourses.findFirst({
            where : {
                courses_id : parseInt(courses_id)
            }
        })

        if(checkUniqueCoursesId){
            return res.status(400).json({
                success : false,
                msg : "Courses id not found!"
            })
        };

        await ModelsImageCourses.create({
            data : {
                image : image,
                courses_id : parseInt(courses_id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create Image courses!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}