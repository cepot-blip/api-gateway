import express from 'express'
import { ImageCoursesCreate, ImageCoursesDelete, ImageCoursesRead, ImageCoursesUpdate } from '../../controllers/Image_courses'

const image_courses_routes = express.Router()

image_courses_routes.post("/image-courses/create", ImageCoursesCreate)
image_courses_routes.post("/image-courses/read", ImageCoursesRead)
image_courses_routes.put("/image-courses/update", ImageCoursesUpdate)
image_courses_routes.delete("/image-courses/delete/:id", ImageCoursesDelete)

export default image_courses_routes