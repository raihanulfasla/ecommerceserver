import express, { Router } from "express";
import { register, login, getUser } from "../controller/userController.js";


const router = Router()

router.post('/register', register);
router.post('/login', login);
router.get('/:id', getUser);
// router.put('/:id', getAdmin);

export default router;

