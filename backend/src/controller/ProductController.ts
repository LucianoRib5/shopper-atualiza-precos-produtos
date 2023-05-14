import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";

export class ProductController {

    productBusiness = new ProductBusiness();

    public uploadProductsFile = async (req: Request, res: Response) => {
        res.send('Arquivo enviado com sucesso!');
    }
}