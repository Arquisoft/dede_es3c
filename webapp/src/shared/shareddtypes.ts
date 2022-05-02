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
amount:number
}

export type ProductToAdd = {
name: string,
description: string,
price: number,
category: string,
urlPhoto: string
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

export type OrderProduct = {
product: ProductToAdd
quantity: number,
shippingPrice: number;
distributionCenter: DistributionCenter;
}

export type Address = {
country_name: string;
locality: string;
postal_code: string;
region: string;
street_address: string; 
}

export type DistributionCenter = {
address: string;
}