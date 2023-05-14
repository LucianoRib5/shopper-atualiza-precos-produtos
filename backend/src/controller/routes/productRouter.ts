import { Router } from "express";
import { ProductController } from "../ProductController";
import { Multer } from "../utils/Multer";

export const productRouter = Router();

const productController = new ProductController();

productRouter.post("/upload", Multer.single('file'), productController.uploadProductsFile);
productRouter.get("/validate-file", productController.validateFile);
productRouter.get("/get-file-data", productController.getUpdateFileData);