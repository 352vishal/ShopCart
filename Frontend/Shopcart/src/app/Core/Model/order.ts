export interface Order {
    _id:number|undefined,
    userId: string ,
    fname: string,
    lname: string,
    address: string,
    city: string,
    postcode: number,
    email: string,
    contact: string,
    totalPrice: number,
}