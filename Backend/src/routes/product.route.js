import express from 'express';
import { createProduct } from '../controllers/product.controller.js';
import multer from 'multer';
import { authenticateToken } from '../middlewares/auth.middleware.js';


const upload= multer({
     storage: multer.memoryStorage() ,
     size: 7 * 1024 * 1024, // 7MB
    });

const router = express.Router();

router.post('/',authenticateToken , upload.array('images', 7), createProduct);

export default router;