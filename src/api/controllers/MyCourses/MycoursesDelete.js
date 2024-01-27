import { response, request } from "express";
import { ModelMyCourses } from "../../../models/Models";

export const MyCoursesDelete = async(req = request, res = response)=>{
    try {
        const {id} = await req.params
        const checkUniqueId = await ModelMyCourses.findFirst({
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

        await ModelMyCourses.delete({
            where : {
                id : parseInt(id)
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