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
  urlPhoto: string,
  amount: number
}

export type CartProduct = {
  name: string,
  description: string,
  price: number,
  urlPhoto: string,
  category: string,
  amount: number
}