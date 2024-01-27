import { request, response } from "express";
import { ModelsUsers } from "../../../models/Models";

export const UsersDelete = async(req = request, res = response) =>{
    try {
        const {id} = await req.params
        const checkUniqueId = await ModelsUsers.findFirst({
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

        await ModelsUsers.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            query : "Successfully delete users!"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}