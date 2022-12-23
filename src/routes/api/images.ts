import express from 'express';
import path from 'path';
import { resizeImage, resizedImage } from '../../utils/handel_ImageResize';
import { promises as fsPromises } from 'fs';
import fs from 'fs';

export const images = express.Router();
export const routes = express.Router();

// API That Take a fileName and Hight&Width to Resize Image And check if the bath of file is correct to save Image after Resized .
images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<unknown> => {
    try {
      const fileName = req.query.fileName as unknown as string;
      //Converts a string to an integer .
      const height = parseInt(req.query.height as unknown as string);
      ////check if A height & width are A positive Numbers
      if (Number.isNaN(height) || height < 1 || height === 0) {
        return res
          .status(200)
          .send('height Must be a positive Number and cant` be Zero');
      }
      const width = parseInt(req.query.width as unknown as string);
      if (Number.isNaN(width) || width < 1 || width === 0) {
        return res
          .status(200)
          .send('width Must be a positive Number and cant` be Zero');
      }

      const saveImgPath: string = resizedImage(fileName, height, width);

      // wait until Image resized and copy to (after-resize Folder)
      if (!fs.existsSync(saveImgPath)) {
        // Await until resizeImage finshed.
        try {
          const newImage = await resizeImage(fileName, height, width);
          await fsPromises.writeFile(saveImgPath, newImage);
        } catch {
          return res.status(200).send('Image Name is Not Correct');
        }
      }
      //Transfer the file at the given path & resolve to an absolute path .
      return res.sendFile(path.resolve(saveImgPath));
    } catch {
      return res
        .status(200)
        .send(
          'Here is an Example of the right path : http://localhost:8000/api/images?fileName=fjord&height=200&width=200'
        );
    }
  }
);
// Api that Return a Copy of the Images Array
routes.get('/', (req: express.Request, res: express.Response): void => {
  const imagesNames: string[] = fs
    .readdirSync(path.resolve('assets/images/before-resize')) ///read a directory.
    .map((fileName) => fileName.slice()); //Method returns a Shallow copy of a portion of an array & method does not change the original array.
  // Message on Screen return JSON object
  res.status(200).json({
    message: 'Choose Image that you want to Resize it',
    fileNames: imagesNames
  });
});
