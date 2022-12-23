import sharp from 'sharp';
import path from 'path';
//Get Image From before-resize folder And Change (Hight&Width).
//resizeImage( ) return Promise that using Sharp  Node.js module
const resizeImage = (
  fileName: string,
  height: number,
  width: number
): Promise<Buffer> => {
  return sharp(path.resolve(`assets/images/before-resize/${fileName}.jpg`))
    .resize({
      width: width,
      height: height
    })
    .toBuffer();
};

// save Image in (after-resized folder) with new(Hight&Width)
// resizedImage(): return string which is the new Path of Resized Image.
const resizedImage = (
  fileName: string,
  height: number,
  width: number
): string => {
  return `assets/images/after-resized/${fileName}${height}${width}.jpg`;
};

export { resizeImage, resizedImage };
