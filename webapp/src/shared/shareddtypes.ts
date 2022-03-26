export type User = {
  name:string
    username:string;
    password:string;
    email:string;
    rol:string
}

export type Product = {
  name: string,
  description: string,
  price: number,
  category: string,
  urlPhoto: string
}

export type Order = {
  id:String
  user: User
  products: ProductInOrder[],
  price: number,
}

export type ProductInOrder = {
  id:String
  product: Product
  quantity: number,
}