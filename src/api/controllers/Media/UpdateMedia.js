import { request, response } from 'express';
import { ModelsMedia } from '../../../models/Models';
import fs from 'fs';
import path from 'path';

const saveImage = (imageData, fileName) => {
  const imagePath = path.join(__dirname, '../../../../assets/images', fileName);
  const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, '');

  fs.writeFileSync(imagePath, base64Data, 'base64');

  return fileName;
};

export const UpdateMedia = async (req = request, res = response) => {
  try {
    const { id } = req.body;
    const base64Image = req.body.image;

    const existingMedia = await ModelsMedia.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingMedia) {
      return res.status(404).json({
        success: false,
        error: 'Media not found!',
      });
    }

    // Hapus foto lama dari server
    const oldImagePath = path.join(__dirname, '../../../../assets/images', existingMedia.image);
    fs.unlinkSync(oldImagePath);

    // Simpan foto baru di server
    const fileName = `media_${existingMedia.id}_${Date.now()}.jpeg`;
    const newImagePath = saveImage(base64Image, fileName);

    // Update data di database
    await ModelsMedia.update({
      where: { id: parseInt(id) },
      data: {
        image: fileName,
      },
    });

    res.status(200).json({
      success: true,
      msg: 'Successfully updated media!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};
