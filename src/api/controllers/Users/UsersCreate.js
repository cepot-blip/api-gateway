import { request, response } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import env from 'dotenv'
import { ModelsUsers } from "../../../models/Models";

env.config()

const salt = bcrypt.genSaltSync(10)

export const UsersCreate = async (req = request, res = response) => {
    try {
        const {
            email,
            password,
            profession,
            role,
            avatar
        } = await req.body; 

        // VALIDASI EMAIL
        const checkUniqueEmail = ModelsUsers.findUnique({
            where : {
                email : email
            }
        });

        if (!checkUniqueEmail) {
            return res.status(401).json({
                status: false,
                message: "Email already exists!"
            });
        }

        const createUsers = await ModelsUsers.create({
            data: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                profession : profession,
                role : role,
                avatar : avatar
            }
        });

        const token = jwt.sign(
            {
                app_name: process.env.APP_NAME,
                id: createUsers.id,
                email: createUsers.email,
                profession : createUsers.profession,
                role : createUsers.role,
                avatar : createUsers.avatar
            },
            process.env.API_SECRET
        );

        res.status(201).json({
            success: true,
            msg: "Successfully created users!",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};