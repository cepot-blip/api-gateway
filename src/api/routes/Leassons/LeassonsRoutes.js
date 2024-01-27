import express from 'express'
import { LeassonsCreate, LeassonsDelete, LeassonsRead, LeassonsUpdate } from '../../controllers/Lessons'

const leassons_routes = express.Router()

leassons_routes.post("/leasson/create", LeassonsCreate)
leassons_routes.post("/leasson/read", LeassonsRead)
leassons_routes.put("/leasson/update", LeassonsUpdate)
leassons_routes.delete("/leasson/delete/:id", LeassonsDelete)

export default leassons_routes