import Product from "./IProduct";

export default interface Products {
    pagination: {
        total: string
    },
    data: Array<Product>
}