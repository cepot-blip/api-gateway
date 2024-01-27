import { request, response } from "express";
import { ModelsCourses } from "../../../models/Models";

export const CoursesUpdate = async (req = request, res = response)=>{
    try {
        const {
            id,
            name,
            certificate,
            thumbnail,
            type,
            status,
            price,
            level,
            description,
            mentor_id
        } = await req.body
        const checkUniqueId = await ModelsCourses.findFirst({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueMentorId = await ModelsCourses.findFirst({
            where : {
                mentor_id : parseInt(mentor_id)
            }
        })

        if(!checkUniqueMentorId){
            return res.status(400).json({
                success : false,
                msg : "Mentor id not found!"
            })
        }

        if(!checkUniqueId){
            return res.status(400).json({
                success : false,
                msg : "Id not found!"
            })
        }

        await ModelsCourses.update({
            where : {
                id : parseInt(id)
            },
            data : {
                mentor_id : parseInt(mentor_id),
                name : name,
                certificate : certificate,
                thumbnail : thumbnail,
                type : type,
                status : status,
                price :parseInt(price),
                level : level,
                description : description
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfullu update courses!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}