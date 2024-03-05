import mongoose, { Document } from "mongoose";

export interface ICategory extends Document {
    categoryName: string;
    categoryDetails: string;
    createdAt: Date;
}

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    categoryDetails: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
