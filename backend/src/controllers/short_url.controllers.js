import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUser } from "../services/short_url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createshorturl = wrapAsync(async (req, res, next) => {
  try {
    const { url } = req.body;
    const short_url = await createShortUrlWithoutUser(url);
    res.send(process.env.APP_URL + short_url);
  } catch (error) {
    next(error);
  }
});
export const redirectFromShortUrl = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (url) { 
    res.redirect(url.full_url);
  } else {
    throw new Error("Short url not found");
  }
});
