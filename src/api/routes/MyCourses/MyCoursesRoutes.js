import express from 'express'
import { MyCoursesCreate, MyCoursesDelete, MyCoursesRead, MyCoursesUpdate } from '../../controllers/MyCourses'

const mycourses_routes = express.Router()

mycourses_routes.post('/mycourses/create', MyCoursesCreate)
mycourses_routes.post('/mycourses/read', MyCoursesRead)
mycourses_routes.put('/mycourses/update', MyCoursesUpdate)
mycourses_routes.delete('/mycourses/delete/:id', MyCoursesDelete)

export default mycourses_routes