import { CustomError, InvalidInput } from "../errors/CustomError";
import { IFileData } from "../models/IFileData";
import { IProduct, UpdateFileDataDTO } from "../models/IProduct";
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

    public allProductsExist = async (fileData: IFileData[]) => {
        try {
            const products = await this.getProducts(fileData);

            const mappedCodes = products.map(p => p.code);

            const nonExistent = fileData
                .filter(p => !mappedCodes.includes(p.code))
                .map(item => item.code);

            if (nonExistent.length === 0) {
                return true;
            }

            return nonExistent;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public checkIfGreater = async (fileData: IFileData[]) => {
        try {
            const products = await this.getProducts(fileData);

            const invalidPrices = [];

            for (const product of products) {
                const matchingItem = fileData.find(item => item.code === product.code);
                if (matchingItem && matchingItem.new_price <= product.cost_price) {
                    invalidPrices.push(matchingItem);
                }
            }

            if (invalidPrices.length === 0) {
                return true;
            }

            return invalidPrices;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public checkPercentageRange = async (fileData: IFileData[]) => {
        try {
            const products = await this.getProducts(fileData);

            const invalidPrices = [];

            for (const product of products) {
                const matchingItem = fileData.find(item => item.code === product.code);
                const priceThreshold = 0.1 * product.sales_price;

                if (matchingItem) {
                    const upperThreshold = product.sales_price + priceThreshold;
                    const lowerThreshold = product.sales_price - priceThreshold;

                    if (
                        matchingItem.new_price > upperThreshold ||
                        matchingItem.new_price < lowerThreshold
                    ) {
                        invalidPrices.push(matchingItem);
                    }
                }
            }

            if (invalidPrices.length === 0) {
                return true;
            }

            return invalidPrices;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public getProducts = async (fileData: IFileData[]): Promise<IProduct[]> => {
        try {
            if (fileData.length < 1) {
                throw new InvalidInput;
            }
            return await this.productRepository.getProducts(fileData);
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
}