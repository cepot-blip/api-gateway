import { response, request } from "express";
import { ModelsMentors } from "../../../models/Models";

export const MentorsCreate = async(req = request, res = response) =>{
    try {
        const {
            name,
            profile,
            email
        } = await req.body

        const checkUniqueEmail = ModelsMentors.findUnique({
            where : {
                email : email
            }
        })

        if(!checkUniqueEmail){
            return res.status(401).json({
                success : false,
                msg : "Email already exists!"
            })
        }

        await ModelsMentors.create({
            data : {
                name : name,
                profile :profile,
                email : email
            }
        })

        res.status(201).json({
            success : true,
            msg : "Successfully create menthors!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}