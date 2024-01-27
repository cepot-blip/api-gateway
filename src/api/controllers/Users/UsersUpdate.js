import { request, response } from "express";
import { ModelsUsers } from "../../../models/Models";

export const UsersUpdate = async(req = request, res = response) =>{
    try {
        const {id, email} = await req.body
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

         await ModelsUsers.update({
            where : {
                id : parseInt(id)
            },
            data : {
                email : email
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update users!"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}