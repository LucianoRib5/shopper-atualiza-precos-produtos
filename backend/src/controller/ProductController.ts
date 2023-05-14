import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { Validation } from "./utils/Validation";
import path from 'path';

export class ProductController {

    productBusiness = new ProductBusiness();

    public uploadProductsFile = async (req: Request, res: Response) => {
        res.send('Arquivo enviado com sucesso!');
    }

    public validateFile = async (req: Request, res: Response) => {
        const tempFolder = path.join(__dirname, 'utils', 'temp');
        Validation.validateFile(tempFolder, res);
    };
}
