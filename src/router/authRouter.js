import express from 'express'
import {auth,otp,review,savePreference} from '../controller/auth.js'
import { authWare } from '../middlewares/authMiddleWare.js';

const router=express.Router();

router.post("/auth",auth);
router.post("/otp",otp);
router.post("/review",authWare,review);
router.post("/preference",authWare,savePreference);
 
export default router;
