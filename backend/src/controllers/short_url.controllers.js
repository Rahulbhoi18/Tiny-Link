import { createShortUrlWithoutUser } from "../services/short_url.service.js"

export const createshorturl = async (req,res)=>{
    const {url} = req.body
    const short_url = await createShortUrlWithoutUser(url)
    res.send (process.env.APP_URL + short_url)
} 