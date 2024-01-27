import express from 'express'
import { MentorRead, MentorsCreate } from '../../controllers/Mentors'

const mentors_routes = express.Router()

mentors_routes.post("/mentor/create", MentorsCreate)
mentors_routes.post("/mentor/read", MentorRead)

export default mentors_routes