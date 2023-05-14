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
};