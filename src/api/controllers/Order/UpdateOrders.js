import { response, request } from "express";
import { ModelsOrders } from "../../../models/Models";

export const UpdateOrder = async (req = request, res = response) =>{
    try {
        const {
            id,
            status,
            user_id,
            courses_id,
            snap_url,
            metadata
        } = await req.body

        const checkUniqueId = await ModelsOrders.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueUserId = await ModelsOrders.findFirst({
            where : {
                user_id : parseInt(user_id)
            }
        })

        const checkUniqueCoursesId = await ModelsOrders.findFirst({
            where :{
                courses_id : parseInt(courses_id)
            }
        })

        if(!checkUniqueId){
            return res.status(400).json({
                success : false,
                msg : "Id not found!"
            })
        }

        if(checkUniqueUserId){
            return res.status(400).json({
                success : false,
                msg : "User id not found!"
            })
        }

        if(checkUniqueCoursesId){
            return res.status(400).json({
                success : false,
                msg : "Courses id not found!"
            })
        }

        await ModelsOrders.update({
            where : {
                id : parseInt(id)
            },
            data : {
                status : status,
                user_id : parseInt(user_id),
                courses_id : parseInt(courses_id),
                snap_url : snap_url,
                metadata : metadata
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update orders!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}