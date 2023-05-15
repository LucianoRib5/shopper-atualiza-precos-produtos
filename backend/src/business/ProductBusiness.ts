import { CustomError, InvalidInput } from "../errors/CustomError";
import { IFileData } from "../models/IFileData";
import { UpdateFileDataDTO } from "../models/IProduct";
import { ProductRepository } from "../repository/ProductRepository";

export class ProductBusiness {

    private productRepository = new ProductRepository();

    public getUpdateFileData = async (fileData: IFileData[]) => {
        try {
            if (fileData.length < 1) {
                throw new InvalidInput;
            }

            const mappedCodes = fileData.map(f => f.code);

            const response = await this.productRepository.selectProductByCode(mappedCodes);

            const responseDTO: UpdateFileDataDTO[] = response.map(i => {

                const currentFile = fileData.find(f => f.code === i.code);
                const newPrice = currentFile ? currentFile.new_price : 0;

                return {
                    code: i.code,
                    name: i.name,
                    currentPrice: i.sales_price,
                    newPrice: newPrice
                }
            });

            return responseDTO;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };

    public updateData = async (fileData: IFileData[]) => {
        try {
            if (fileData.length < 1) {
                throw new InvalidInput;
            }

            const response = await this.productRepository.updateData(fileData);

            return response;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
}