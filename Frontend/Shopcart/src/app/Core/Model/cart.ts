export interface Cart {
     _id: number | string;
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