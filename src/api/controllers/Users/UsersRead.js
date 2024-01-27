import { request, response } from "express"
import { ModelsUsers } from "../../../models/Models"

export const UsersRead = async (req = request, res = response) => {
    try {
        const { page = 1, limit = 10 } = await req.query
		let skip = (page - 1) * limit
		const { filter } = await req.body
		const result = await ModelsUsers.findMany({
            skip: parseInt(skip),
			take: parseInt(limit),
			orderBy: { id: "desc" },
			where: filter,
            include : {
                MyCourses : {
                    select : {
                        id : true,
                        courses_id : true,
                        user_id : true
                    }
                },
                Reviews : {
                    select : {
                        id : true,
                        user_id : true,
                        courses_id : true,
                        rating : true,
                        note : true
                    }
                }
            }
        })
		
        const conn = await ModelsUsers.count()

		res.status(200).json({
			success: true,
			current_page: parseInt(page),
			total_page: Math.ceil(conn / limit),
			total_data: conn,
			query: result,
		})
        
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}