import { response, request } from "express";
import { ModelMyCourses } from "../../../models/Models";

export const MyCoursesUpdate = async(req = request, res = response)=>{
    try {
        const {
            id,
            courses_id,
            user_id
        } = await req.body
        const checkUniqueId = await ModelMyCourses.findFirst({
            where : {
                id : parseInt(id)
            }
        })

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

        if(!checkUniqueUserId){
            return res.status(400).json({
                success : false,
                msg : "User id not found!"
            })
        }

        await ModelMyCourses.update({
            where : {
                id : parseInt(id)
            },
            data : {
                courses_id : parseInt(courses_id),
                user_id : parseInt(user_id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update my courses!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}