import express, { Router } from "express";
import { register, login,getAdmin,getAllAdmin } from "../controller/adminController.js";
import { verifyAdminToken } from "../middleware/tokenVerifying.js";


const router = Router()

router.post('/register', register);
router.post('/login', login);
router.get('/:id',verifyAdminToken, getAdmin);
router.get('/',verifyAdminToken, getAllAdmin);
// router.put('/:id', getAdmin);

export default router;

