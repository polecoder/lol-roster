/**
 * Transforms an image using Cloudinary's image transformation API
 *
 * @param {string} cloudinaryParameters The Cloudinary parameters to apply to the image
 * @param {string} imageURL The URL of the image to transform
 * @returns {string} The cloudinary URL for the transformed image
 */
export function transformImage(cloudinaryParameters, imageURL) {
  const CLOUDINARY_URL = "https://res.cloudinary.com";
  const CLOUD_NAME = "dak46kbmg";
  return `${CLOUDINARY_URL}/${CLOUD_NAME}/image/fetch/${cloudinaryParameters}/${imageURL}`;
}
