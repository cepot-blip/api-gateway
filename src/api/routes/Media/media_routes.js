import express from 'express'
import { CreateMedia } from '../../controllers/Media/CreateMedia'
import { ReadMedia } from '../../controllers/Media/ReadMedia'
import { UpdateMedia } from '../../controllers/Media/UpdateMedia'
import { DeleteMedia } from '../../controllers/Media/DeleteMedia'

const media_routes = express.Router()

media_routes.post("/media/create", CreateMedia)
media_routes.post("/media/read", ReadMedia)
media_routes.put("/media/update", UpdateMedia)
media_routes.delete("/media/delete", DeleteMedia)


export default media_routes