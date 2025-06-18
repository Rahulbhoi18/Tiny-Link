import { saveShortUrl } from "../dao/short_url.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlWithoutUser = async (url) => {
  const short_url = generateNanoId(7);
  await saveShortUrl(short_url, url)
  return short_url
}
export const createShortUrlWithUser = async (url,userId) => {
  const short_url = generateNanoId(7);
  await saveShortUrl(short_url,url  ,userId)
  return short_url
}
