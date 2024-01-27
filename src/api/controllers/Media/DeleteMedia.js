import { request, response } from 'express';
import { ModelsMedia } from '../../../models/Models';
import fs from 'fs';
import path from 'path';

export const DeleteMedia = async (req = request, res = response) => {
  try {
    const { id } = req.body;

    const existingMedia = await ModelsMedia.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingMedia) {
      return res.status(404).json({
        success: false,
        error: 'Media not found!',
      });
    }

    const imagePath = path.join(__dirname, '../../../../assets/images', existingMedia.image);
    fs.unlinkSync(imagePath);

    await ModelsMedia.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      msg: 'Media deleted successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};
