import { IFileData } from "../models/IFileData";
import { IProduct } from "../models/IProduct";
import { BaseRepository } from "./BaseRepository";

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

    public getProducts = async (fileData: IFileData[]): Promise<IProduct[]> => {
        try {
            const products: IProduct[] = await ProductRepository
                .connection('products')
                .whereIn('code', fileData.map(i => i.code));
            return products;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
};