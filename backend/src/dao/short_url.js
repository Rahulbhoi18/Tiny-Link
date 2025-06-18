import { URL } from "../models/short_url.model.js";
export const saveShortUrl= async (shortUrl, longurl, userId) =>{
    const newUrl =  new URL({
        full_url: longurl,
        short_url: shortUrl
    })
    if (userId){
        newUrl.user_id = userId
    }
    newUrl.save()
};

