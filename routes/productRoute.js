import express, { Router } from "express";
import multer from "multer";
import {
    createProduct,
    deleteProductById,
    getProduct,
    getProductById,
    updateProductById
} from "../controller/productController.js";


const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })


router.post('/', upload.single('image'),createProduct)
router.get('/',getProduct)
router.get('/:id', getProductById)
router.put("/:id",updateProductById)
router.delete("/:id",deleteProductById)


export default router;

