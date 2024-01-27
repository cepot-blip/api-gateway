import { response, request } from "express";
import { ModelsReviews } from "../../../models/Models";

export const ReviewCreate = async (req = request, res = response)=>{
    try {
        const {
            user_id,
            courses_id,
            rating,
            note
        } = await req.body
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

        if(checkUniqueUserId){
            return res.status(400).json({
                success : false,
                msg : "User id not found!"
            })
        }

        if(checkUniqueCoursesId){
            return res.status(400).json({
                success : false,
                msg : "User id not found!"
            })
        }

        await ModelsReviews.create({
            data : {
                user_id : parseInt(user_id),
                courses_id : parseInt(courses_id),
                rating : parseInt(rating),
                note : note
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create reviews!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}