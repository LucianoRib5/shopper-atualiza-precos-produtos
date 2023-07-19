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

        if (response.dataIsOk) {
            const fileData = await FileSystem.readDir();

            const allExistOrNotExist = await this.productBusiness.allProductsExist(fileData);

            if (Array.isArray(allExistOrNotExist)) {
                res.send({ dataIsOk: true, rulesIsOk: false, message: 'produtos inexistentes', divergent: allExistOrNotExist })
                return;
            }

            const checkIfGreater = await this.productBusiness.checkIfGreater(fileData);

            if (Array.isArray(checkIfGreater)) {
                res.send({ dataIsOk: true, rulesIsOk: false, message: 'produtos abaixo do preço de custo', divergent: checkIfGreater })
                return;
            }

            const checkPercentageRange = await this.productBusiness.checkPercentageRange(fileData);

            if (Array.isArray(checkPercentageRange)) {
                res.send({ dataIsOk: true, rulesIsOk: false, message: 'reajustes fora da regra de 10% maior ou menor que o preço atual', divergent: checkPercentageRange })
                return;
            }

            res.send(response);
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
