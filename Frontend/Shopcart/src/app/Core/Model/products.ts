// Seler Home page Product [data type] interface file code
export interface Product {
   _id: number | string;
    id: string;
    productId: string;
    productName: string;
    productPrice: number;
    productColour: string;
    productQuantity: number;
    productCategory: string;
    productImage?:File
    productDescription: string;
}