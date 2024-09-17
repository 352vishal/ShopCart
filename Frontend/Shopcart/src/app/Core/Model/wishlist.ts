export interface Wishlist {
    _id: any;
    userId: string;
    productId: string;
    productName: string;
    productPrice: number;
    productColour: string;
    productQuantity: number;
    productCategory: string;
    productImage?:File
    productDescription: string;
}