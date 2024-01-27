import { request, response } from 'express';
import { ModelsMedia } from '../../../models/Models';

export const ReadMedia = async (req = request, res = response) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.body.filter ?? {};
    const result = await ModelsMedia.findMany({
      skip: skip,
      take: limit,
      orderBy: { id: 'desc' },
      where: filter,
    });

    const conn = await ModelsMedia.count();

    const totalPage = Math.ceil(conn / limit);

    const formattedResult = result.map((media) => ({
      id: media.id,
      image: media.image,
      created_at: media.created_at,
      updated_at: media.updated_at,
    }));

    res.status(200).json({
      success: true,
      current_page: page,
      total_page: totalPage,
      total_data: conn,
      query: formattedResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
