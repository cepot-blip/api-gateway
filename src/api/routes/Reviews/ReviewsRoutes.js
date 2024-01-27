import express from 'express'
import { ReviewCreate, ReviewDelete, ReviewRead, ReviewUpdate } from '../../controllers/Reviews'

const reviews_routes = express.Router()

reviews_routes.post("/reviews/create", ReviewCreate)
reviews_routes.post("/reviews/read", ReviewRead)
reviews_routes.put("/reviews/update", ReviewUpdate)
reviews_routes.delete("/reviews/delete/:id", ReviewDelete)


export default reviews_routes