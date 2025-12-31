import { Schema, model, Document } from "mongoose";

type Questions = {
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
    categories: string[];
    vertexNumber: number;
    textured: boolean;
    rigging: boolean;
    uvWrapped: boolean;
    images: Images;
    questions: Questions[];
    objectURL: string;
};

const imagesSchema = new Schema<Images>({
    stockImage: { type: String, required: true },
    images: [{ type: String, required: true }],
})

const questionsSchema = new Schema<Questions>({
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
        categories: { type: [String], required: true },
        vertexNumber: { type: Number, required: true, min: 0 },
        textured: { type: Boolean, required: true },
        rigging: { type: Boolean, required: true },
        uvWrapped: { type: Boolean, required: true },
        images: { type: imagesSchema, required: true },
        questions: { type: [questionsSchema], default: [] },
        objectURL: { type: String, required: true },
    },
    { timestamps: true }
);

const Product = model<InterfaceProduct>("Product", productSchema);

export default Product;
