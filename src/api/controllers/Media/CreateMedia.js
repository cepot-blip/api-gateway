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

export const CreateMedia = async (req = request, res = response) => {
  try {
    const base64Image = req.body.image;

    const fileName = `media_${Date.now()}.jpeg`;

    const imagePath = saveImage(base64Image, fileName);

    const createdMedia = await ModelsMedia.create({
      data: {
        image: fileName,
      },
    });

    res.status(201).json({
      success: true,
      msg: {
        id: createdMedia.id,
        image: fileName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};
