import { Schema, model, Document } from "mongoose";

type Specs = {
    key: string;
    value: string;
}

export interface InterfaceProduct extends Document {
    name: string;
    price: number;
    description: string;
    category: string;
    brand: string;
    productImageUrl: string;
    stock: number;
    specs: Specs[];
};

const specSchema = new Schema<Specs>({
    key: { type: String, required: true },
    value: { type: String, required: true },
},
    { _id: false }
);

const productSchema = new Schema<InterfaceProduct>(
    {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        description: { type: String, required: true },
        category: { type: String, required: true },
        brand: { type: String, required: true },
        productImageUrl: { type: String, required: true },
        stock: { type: Number, required: true, min: 0, default: 0 },
        specs: { type: [specSchema], default: [] },
    },
    { timestamps: true }
);

const Product = model<InterfaceProduct>("Product", productSchema);
export default Product;
