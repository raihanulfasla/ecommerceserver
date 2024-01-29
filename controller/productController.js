import mongoose from "mongoose";


export const createProduct = (req, res) => {
    console.log(req.file, 'file');
    mongoose.connection.collection("product").insertOne({ ...req.body, profile: req.file?.filename }).then((response) => {
        res.status(200).json({ product: response, message: "Succesfully" });

    }).catch((err) => {
        res.status(400).json({ message: err.message || "error" })
    })
}

export const getProduct = async (req, res) => {
    const response = await mongoose.connection.collection("product").find().toArray();

    if (response.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ product: response });
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

