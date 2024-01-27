import { query, request, response } from "express";
import { ModelsChapters } from "../../../models/Models";

export const ChaptersRead = async(req = request, res = response)=>{
    try {
        const { page =  1, limit = 10 } = await req.query
        let skip = (page -1) * limit
        const { filter } = await req.body
        const result = await ModelsChapters.findMany({
            skip : parseInt(skip),
            take : parseInt(limit),
            orderBy : {
                id : "desc"
            },
            where : filter,
            include :{
                Lessons : {
                    select : {
                        id : true,
                        name : true,
                        video : true,
                        chapter_id : true
                    }
                }
            }
        })

        const con = await ModelsChapters.count()

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