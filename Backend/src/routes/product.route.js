import express from 'express';
import { createProduct } from '../controllers/product.controller.js';
import multer from 'multer';
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import { get } from 'mongoose';
import { getSellerProducts } from '../controllers/product.controller.js';


const upload= multer({
     storage: multer.memoryStorage() ,
     size: 7 * 1024 * 1024, // 7MB
    });

const router = express.Router();

router.post('/',authenticateSeller , upload.array('images', 7), createProduct);

router.get("/seller",authenticateSeller,getSellerProducts 
)

export default router;