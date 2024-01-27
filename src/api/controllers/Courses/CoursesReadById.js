import { response, request } from "express";
import { ModelsCourses } from "../../../models/Models";


export const CoursesReadById = async(req = request, res = response)=>{
    try {
        const { id } = await req.params
        const result = await ModelsCourses.findUnique({
            where : {
                id : parseInt(id)
            },

            include : {
                Chapter :{
                    select : {
                        id : true,
                        name : true,
                        courses_id : true
                    }
                },
                Image_courses : {
                    select : {
                        id : true,
                        image : true,
                        courses_id : true
                    }
                },
                MyCourses : {
                    select : {
                        id : true,
                        user_id : true,
                        courses_id : true
                    }
                },
                Reviews : {
                    select : {
                        id : true,
                        user_id : true,
                        courses_id : true,
                        rating : true,
                        note : true
                    }
                }
            }
        })

        if(!result){
            res.status(400).json({
                success : false,
                msg : "Data not found!"
            })
        }

        res.status(200).json({
            success : true,
            query : result
        })


    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}