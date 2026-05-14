import productModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js"


export const createProduct = async (req, res) => {
      const { title, description, priceAmount, priceCurrency } = req.body;
      const seller = req.user._id;
      const images = await Promise.all(req.files.map(async (file) => {
        const uploaded = await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname
        })
        return { ImageUrl: uploaded.url }
    }))

      const product = await productModel.create({
        title,
        description,
        price: {
            amount: priceAmount,
            currency: priceCurrency || 'INR'
        },
        seller,
        images
      })

        res.status(201).json({ message: "Product created successfully", product });

}