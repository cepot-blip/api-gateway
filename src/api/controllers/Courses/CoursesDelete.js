import { request, response } from "express";
import { ModelsCourses } from "../../../models/Models";

export const CoursesDelete = async(req = request, res = response) =>{
    try {
        const {id}= await req.params
        const checkUniqueId = await ModelsCourses.findFirst({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(400).json({
                success : false,
                msg : "Id not found!"
            })
        }

        await ModelsCourses.delete({
            where : {
                id : parseInt(id)
            },
        })

        res.status(200).json({
            success : true,
            msg : "Successfully delete courses!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}