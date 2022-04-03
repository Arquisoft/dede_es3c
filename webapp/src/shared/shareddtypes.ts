export type User = {
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

export type Order = {
  id:string
  user: string
  products: ProductInOrder[],
  price: number,
  priceIVA: number
}

export type ProductInOrder = {
  id:string
  product: Product
  quantity: number,
}

export type Address = {
  country_name: string;
  locality: string;
  postal_code: string;
  region: string;
  street_address: string; 
}