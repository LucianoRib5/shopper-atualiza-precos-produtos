export interface IProduct {
    code: number,
    name: string,
    sales_price: number
    cost_price: number
}

export interface UpdateFileDataDTO {
    code: number,
    name: string,
    currentPrice: number,
    newPrice: number
}