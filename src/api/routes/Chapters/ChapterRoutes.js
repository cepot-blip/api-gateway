import express from 'express'
import { ChaptersCreate, ChaptersDelete, ChaptersRead, ChaptersUpdate } from '../../controllers/Chapters'
const chapters_routes = express.Router()

chapters_routes.post("/chapters/create", ChaptersCreate)
chapters_routes.post("/chapters/read", ChaptersRead)
chapters_routes.put("/chapters/update", ChaptersUpdate)
chapters_routes.delete("/chapters/delete/:id", ChaptersDelete)

export default chapters_routes