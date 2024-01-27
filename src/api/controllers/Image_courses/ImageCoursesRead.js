import { response, request } from "express";
import { ModelsImageCourses } from "../../../models/Models";

export const ImageCoursesRead = async(req =  request, res = response)=>{
    try {
        const { page =  1, limit = 10 } = await req.query
        let skip = (page -1) * limit
        const { filter } = await req.body
        const result = await ModelsImageCourses.findMany({
            skip : parseInt(skip),
            take : parseInt(limit),
            orderBy : {
                id : "desc"
            },
            where : filter,
        })

        const con = await ModelsImageCourses.count()

        res.status(200).json({
            success : true,
            current_page : parseInt(page),
            total_page : Math.ceil(con/limit),
            total_data : con,
            query : result
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}