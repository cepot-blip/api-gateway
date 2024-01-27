import express from 'express'
import { UsersCreate, UsersDelete, UsersLogin, UsersRead, UsersUpdate } from '../../controllers/Users'

const users_routes = express.Router()

users_routes.post("/users/create", UsersCreate)
users_routes.post("/users/login", UsersLogin)
users_routes.post("/users/read", UsersRead)
users_routes.put("/users/update", UsersUpdate)
users_routes.delete("/users/delete/:id", UsersDelete)

export default users_routes