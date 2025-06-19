import { Router } from 'express';
import { createshorturl } from '../controllers/short_url.controllers.js';
const urlRouter = Router();
urlRouter.route('/').post(createshorturl);
export default urlRouter;
