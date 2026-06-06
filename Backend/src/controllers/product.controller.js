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

export const getSellerProducts = async (req, res) => {
    const seller = req.user._id;
    const products = await productModel.find({ seller }).populate('seller', 'name email');
    res.status(200).json({ products });
}

export const getAllProducts = async (req, res) =>{
  const products = await productModel.find()
  res.status(200).json({
    products
  })
}

export const getProductDetails = async (req, res) => {
  const { productId } = req.params;
  const product = await productModel.findById(productId)
  if(!product){
    return res.status(404).json({
      message:"Product not found",
      success:false
    })
  }
  res.status(200).json({ 
    message: "Product details fetched successfully",
    success:true,
    product });
}