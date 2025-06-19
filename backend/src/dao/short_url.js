import { URL } from '../models/short_url.model.js';
import { ConflictError } from '../utils/errorHandler.js';
export const saveShortUrl = async (shortUrl, longurl, userId) => {
  try {
    const newUrl = new URL({
      full_url: longurl,
      short_url: 'AjHkXRw',
    });
    if (userId) {
      newUrl.user_id = userId;
    }
    await newUrl.save();
  } catch (error) {
    if (error.code == 11000) {
      throw new ConflictError(error);
    }

    throw new Error(error);
  }
};

export const getShortUrl = async (shortUrl) => {
  return await URL.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } }
  );
};
