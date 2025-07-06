import { Router  } from "express";
import {register} from '../controllers/auth.controller.js'
import {validate} from "../middlewares/validator.middleware.js"
import {userRegistartionValidator} from "../validators/index.js"

const router = Router();
router.route('/').post(userRegistartionValidator(),validate,register) // foctory patherns

export default router;
