import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { Validation } from "./utils/Validation";
import { FileSystem } from "./utils/FileSystem";

export class ProductController {

    private productBusiness = new ProductBusiness();

    public uploadProductsFile = async (req: Request, res: Response) => {
        res.send('Arquivo enviado com sucesso!');
    }

    public validateFile = async (req: Request, res: Response) => {
        const response = await Validation.validateFile(res);
        
        if (response.validFormat) {
            res.send(response.validFormat);
        } else {
            res.send(response);
        }
    };

    public getUpdateFileData = async (req: Request, res: Response) => {
        const fileData = await FileSystem.readDir();
        const response = await this.productBusiness.getUpdateFileData(fileData);
        res.send(response);
    };

    public updateData = async (req: Request, res: Response) => {
        const fileData = await FileSystem.readDir();
        const response = await this.productBusiness.updateData(fileData);
        res.send(response);
    }
}
