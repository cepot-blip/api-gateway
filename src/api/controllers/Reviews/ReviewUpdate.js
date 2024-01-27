import { response, request } from "express";
import { ModelsReviews } from "../../../models/Models";

export const ReviewUpdate = async (req = request, res = response) =>{
    try {
        const {
            id,
            user_id,
            courses_id,
            rating,
            note
        } = await req.body
        const checkUniqueId = await ModelsReviews.findFirst({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueUserId = await ModelsReviews.findFirst({
            where : {
                user_id : parseInt(user_id)
            }
        })

        const checkUniqueCoursesId = await ModelsReviews.findFirst({
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

        if(!checkUniqueUserId){
            return res.status(400).json({
                success : false,
                msg : "User id not found!"
            })
        }

        if(!checkUniqueCoursesId){
            return res.status(400).json({
                success : false,
                msg : "Courses id not found!"
            })
        }

        await ModelsReviews.update({
            where : {
                id : parseInt(id)
            },
            data : {
                user_id : parseInt(user_id),
                courses_id : parseInt(courses_id),
                rating : parseInt(rating),
                note : note
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully creat reviews!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}