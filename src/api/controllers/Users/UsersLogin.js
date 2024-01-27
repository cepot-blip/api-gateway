import { request, response } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cryptojs from 'crypto-js'
import env from "dotenv"
env.config()

import { ModelsUsers } from "../../../models/Models";

const salt = bcrypt.genSaltSync(10)

export const UsersLogin = async (req = request, res = response) =>{
    try {
        const {email, password} =  await req.body
        const usersCheck = await ModelsUsers.findFirst({
            where : {
                email : email
            }
        })

        if(!usersCheck) {
            return res.status(401).json({
                success : false,
                msg : "Email not found!"
            })
        }

        const comparePassword = await bcrypt.compareSync(password, usersCheck.password, salt)
        const token = await jwt.sign({
            app_name : process.env.API_SECRET,
            id : usersCheck.id,
            email : usersCheck.email
        },
        process.env.API_SECRET,
        {
            expiresIn : "1d"
        }
        )

        if(!comparePassword){
            return res.status(401).json({
                success : false,
                msg : "Password tidak sama!"
            })
        }

        const hashToken = await cryptojs.AES.encrypt(token, process.env.API_SECRET).toString()

        res.status(200).json({
            success : true,
            token : hashToken
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}