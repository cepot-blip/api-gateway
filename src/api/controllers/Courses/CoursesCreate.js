import { request, response } from "express";
import { ModelsCourses } from "../../../models/Models";

export const CoursesCreate = async(req = request, res =  response) =>{
    try {
        const {
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

        await ModelsCourses.create({
            data : {
                name : name,
                certificate : certificate,
                thumbnail : thumbnail,
                type : type,
                status : status,
                price : parseInt(price),
                level : level,
                description : description,
                mentor_id : parseInt(mentor_id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create courses!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}