import express from 'express'
import { CoursesCreate, CoursesDelete, CoursesRead, CoursesReadById, CoursesUpdate } from '../../controllers/Courses'

const courses_routes = express.Router()

courses_routes.post("/courses/create", CoursesCreate)
courses_routes.post("/courses/read", CoursesRead)
courses_routes.get("/courses/read-by-id/:id", CoursesReadById)
courses_routes.put("/courses/update", CoursesUpdate)
courses_routes.delete("/courses/delete/:id", CoursesDelete)

export default courses_routes