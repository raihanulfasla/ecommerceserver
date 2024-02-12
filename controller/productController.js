import mongoose from "mongoose";
import { Product } from "../model/Product.js";


export const createProduct = async(req, res) => {
    try {
        const { name, price, description, qunatity } = req.body

        
        if (!name) {
            return res.status(400).json({ message: "name is missing" })
        }
        if (!price) {
            return res.status(400).json({ message: "price is missing" })
        }
        if (!description) {
            return res.status(400).json({ message: "description is missing" })
        }
        if (!qunatity) {
            return res.status(400).json({ message: "quantity is missing" })
        }

        const isProducNameExist = await Product.findOne({name:name})

        if(!!isProducNameExist){
            return res.status(400).json({ message: "product name is exising , please enter another one" })
        }
        
        const newProduct = new Product({ name,description,price,qunatity })

        const savedProduct = await newProduct.save();
       
        return res.status(201).json({product:savedProduct,message: 'successfully inserted product into db' });

    } catch (error) {
        return res.status(404).json({message: error.message || 'error' });      
    }
}

export const getProducts = async (req, res) => {

    const products = await Product.find();

    if (products.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ products: products });
    }
}


export const getProductById = async (req, res) => {

    const response = await mongoose.connection.collection("product").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if (response) {
        return res.status(200).json({ product: response });
    } else {
        return res.status(404).json("no entries yet");
    }
}

export const updateProductById = async (req, res) => {

    console.log(req.params.id);

    const response = await mongoose.connection.collection("product").updateOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, { $set: req.body })

    if (response) {
        return res.status(200).json({ message: "updated" });
    } else {
        return res.status(400).json({ message: "error in update of product" });
    }
}


export const deleteProductById = async (req, res) => {

    console.log(req.params.id);

    // return true

    const response = await mongoose.connection.collection("product").deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) })

    if (response) {
        return res.status(200).json("deleted");
    } else {
        return res.status(400).json({ message: "errror in delete of product" });
    }
}

