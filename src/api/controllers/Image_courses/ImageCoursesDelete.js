import { response, request } from "express";
import { ModelsImageCourses } from "../../../models/Models";

export const ImageCoursesDelete = async (req = request, res = response)=>{
    try {
        const {id} = await req.params
        const checkUniqueId = await ModelsImageCourses.findFirst({
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

        await ModelsImageCourses.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg :"Successfully delete image courses!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}