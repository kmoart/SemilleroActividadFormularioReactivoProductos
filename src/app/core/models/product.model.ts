export interface ProductModel {
    productId:     number;
    typeOfProduct: number;
    name:          string;
    price:         number;
    discount?:     number;
}