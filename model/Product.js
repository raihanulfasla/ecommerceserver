import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name"],
    },
    description: {
        type: String,
        required: [true, "Please add description"],
    },
    price: {
        type: Number,
        required: [true, "please add price"],
    },
    qunatity: {
        type: Number,
        required: [true, "please add quantity"],
    },
    productPic:{
        type:String,
        required: [true, "please add oroduct photo"],

    }
},
    {
        timestamps: true,
    }
);

export const Product = mongoose.model("Product", productSchema);
