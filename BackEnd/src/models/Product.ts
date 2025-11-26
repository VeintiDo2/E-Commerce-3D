import { Schema, model, Document } from "mongoose";

type Specs = {
    key: string;
    value: string;
}

type Images = {
    stockImage: string;
    images: string[];
}

export interface InterfaceProduct extends Document {
    name: string;
    price: number;
    description: string;
    category: string;
    vertexNumber: number;
    textured: boolean;
    images: Images;
    specs: Specs[];
};

const imagesSchema = new Schema<Images>({
    stockImage: { type: String, required: true },
    images: [{ type: String, required: true }],
})

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
        vertexNumber: { type: Number, required: true, min: 0 },
        textured: { type: Boolean, required: true },
        images: { type: imagesSchema, required: true },
        specs: { type: [specSchema], default: [] },
    },
    { timestamps: true }
);

const Product = model<InterfaceProduct>("Product", productSchema);
export default Product;
