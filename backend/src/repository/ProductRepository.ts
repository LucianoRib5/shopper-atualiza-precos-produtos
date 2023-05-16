import { IFileData } from "../models/IFileData";
import { IProduct } from "../models/IProduct";
import { BaseRepository } from "./BaseRepository";
import knex, { Knex } from 'knex';

export class ProductRepository extends BaseRepository {

    public selectProductByCode = async (param: number | number[]): Promise<IProduct[]> => {
        try {
            const products: IProduct[] = await ProductRepository
                .connection('products')
                .whereIn('code', Array.isArray(param) ? param : [param]);
            return products;
        } catch (error: any) {
            throw new Error(error.message);
        };
    };

    public updateData = async (fileData: IFileData[]): Promise<string> => {
        try {
            const knex = ProductRepository.connection;
            for (const data of fileData) {
                await knex('products')
                    .where('code', data.code)
                    .update('sales_price', data.new_price);
            }
            return 'Preços atualizados com sucesso';
        } catch (error: any) {
            throw new Error(error.message);
        };
    }

    public allProductsExist = async (fileData: IFileData[]): Promise<number[] | boolean> => {
        try {
            const products: IProduct[] = await ProductRepository
                .connection('products')
                .whereIn('code', fileData.map(i => i.code));

            const existing = products.map(p => p.code);

            const nonExistent = fileData
                .filter(p => !existing.includes(p.code))
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
        const products: IProduct[] = await ProductRepository
            .connection('products')
            .whereIn('code', fileData.map(i => i.code));

        const invalidPrices = [];

        for (const product of products) {
            const matchingItem = fileData.find(item => item.code === product.code);
            if (matchingItem && matchingItem.new_price <= product.cost_price) {
                invalidPrices.push(matchingItem);
            }
        }

        if (invalidPrices.length === 0) {
            return true;
        } else {
            return invalidPrices;
        }
    }

    public checkPercentageRange = async (fileData: IFileData[]) => {
        const products: IProduct[] = await ProductRepository
            .connection('products')
            .whereIn('code', fileData.map(i => i.code));

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
        } else {
            return invalidPrices;
        }
    }

};