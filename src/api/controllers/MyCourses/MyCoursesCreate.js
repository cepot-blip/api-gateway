import { request, response } from "express";
import { ModelMyCourses } from "../../../models/Models";

export const MyCoursesCreate = async (req = request, res = response)=>{
    try {
        const {
            courses_id,
            user_id
        } = await req.body

        const checkUniqueCoursesId = await ModelMyCourses.findFirst({
            where : {
                courses_id : parseInt(courses_id)
            }
        })

        const checkUniqueUserId = await ModelMyCourses.findFirst({
            where : {
                user_id : parseInt(user_id)
            }
        })

        if(checkUniqueCoursesId){
            return res.status(400).json({
                success : false,
                msg : "Courses id not found!"
            })
        }

        if(checkUniqueUserId){
            return res.status(400).json({
                success : false,
                msg : "User id not found!"
            })
        }


        await ModelMyCourses.create({
            data : {
                courses_id : parseInt(courses_id),
                user_id : parseInt(user_id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create my courses!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })      
    }
}