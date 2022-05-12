import {User, Product, Order, OrderProduct, DistributionCenter} from '../shared/shareddtypes';
const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

export async function addUser(user:User):Promise<boolean>{
    let response = await fetch(apiEndPoint+'/users', {
        method: 'POST',
        headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'},
        body: JSON.stringify({'username':user.username, 'password': user.password, 'rol': user.rol, 'email':user.email})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getUsers():Promise<User[]>{
    let response = await fetch(apiEndPoint+'/users');
    return response.json()
}


export async function checkUserAndLogin(username: string, password:string) {
  let response = await fetch(apiEndPoint+'/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'},
      body: JSON.stringify({'username': username, 'password': password})
    });

    return response;

}

export async function signup(username:string ,password:string, email:string) {
  let response = await fetch(apiEndPoint+'/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'},
      body: JSON.stringify({'username': username, 'password': password, 'email':email, 'rol':"Client"})
    });
    return response.json();
}

export async function getUser(username: string): Promise<User> {
  let response = await fetch(apiEndPoint + "/users/username/" + username, {
    method: "GET",
    headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'},
  });
  return response.json();
}

export async function getProducts(): Promise<Product[]>{
  let response = await fetch(apiEndPoint + '/products');
  return response.json()
}

export async function pruebaApi(name: string): Promise<Product> {
  let response = await fetch(apiEndPoint + '/products/name/' + name);
  return response.json()
}

export async function getProductsByName(name: string): Promise<Product[]> {
  let response = await fetch(apiEndPoint + '/products/namepartial/' + name, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json()
}

export async function getProductByName(name: string): Promise<Product> {
  let response = await fetch(apiEndPoint + '/products/name/' + name, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return response.json()
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  let response = await fetch(apiEndPoint + '/products/category/' + category, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json()
}

export async function addProduct(product: Product): Promise<boolean>{
  let response = await fetch(apiEndPoint + '/products', {
    method: 'POST',
    headers: { authorization: localStorage.getItem("token") + "", 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'name': product.name, 'description': product.description, 'price': product.price, 'category': product.category, 'urlPhoto': product.urlPhoto })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function updateProduct(id: string, product: Product): Promise<boolean> {
  let response = await fetch(apiEndPoint + '/products/' + id, {
    method: 'PUT',
    headers: { authorization: localStorage.getItem("token") + "", 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'name': product.name, 'description': product.description, 'price': product.price, 'category': product.category, 'urlPhoto': product.urlPhoto })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function deleteProduct(id: string): Promise<boolean> {
  let response = await fetch(apiEndPoint + '/products/' + id, {
    method: 'DELETE',
    headers: { authorization: localStorage.getItem("token") + "", 'Content-Type': 'application/json' },
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function getOrders(): Promise<Order[]>{
  let response = await fetch(apiEndPoint + '/orders');
  return response.json()
}

export async function getOrdersByEmail(email:string) {
  let response = await fetch(apiEndPoint+'/orders/user/' + email , {
    method: 'GET',
    headers: {  authorization: localStorage.getItem("token") +"" , 'Content-Type': 'application/json' }
  });
    return response.json();
}

export async function getAddress(webID:string) {
  let response = await fetch(apiEndPoint+'/users/userpod/' + webID);
    return response.json();
}

export async function getProductsByPrice(min: number, max: number): Promise<Product[]> {
  let response = await fetch(apiEndPoint + '/products/price/' + min + '/' + max, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

export async function getRelatedProducts(name: string, category: string): Promise<Product[]> {
  let response = await fetch(apiEndPoint + '/products/name/' + name + '/' + category, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}


export async function addOrder(email:string, products: OrderProduct[], address:string) {
  let response = await fetch(apiEndPoint + '/orders', {
    method: 'POST',
    headers: { authorization: localStorage.getItem("token") + "", 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'user':email, 'products': products, 'address':address})
  });
  return response.json();
}

export async function getDistributionCenters(product: Product): Promise<DistributionCenter[]>{
  let response = await fetch(apiEndPoint+'/distributioncenters/'+ product.name + '/' + product.amount , {
    method: 'GET',
    headers: {  authorization: localStorage.getItem("token") +"" , 'Content-Type': 'application/json' }
  });
  return response.json();
}

export async function getShippingPrice(products: OrderProduct[], address:string): Promise<number> {
  let response = await fetch(apiEndPoint + '/orders/shippingprice', {
    method: 'POST',
    headers: {authorization: localStorage.getItem("token") +"" , 'Content-Type': 'application/json' },
    body: JSON.stringify({'products': products, 'address':address})
  });
  return response.json();
}

export async function updatePasswordByEmail(email:String, password:String) {
  let response = await fetch(apiEndPoint + '/users/email/' + email + '/password/' + password, {
    method: 'PUT',
    headers: { authorization: localStorage.getItem("token") + "", 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'email': email, 'password': password})
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function updateUserByEmail(email:String, username:String) {
  let response = await fetch(apiEndPoint + '/users/email/' + email + '/name/' + username, {
    method: 'PUT',
    headers: { authorization: localStorage.getItem("token") + "", 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'email':email, 'username/': username})
  });
  if (response.status === 200)
    return true;
  else
    return false;
}
export async function existUser(username: string): Promise<Boolean> {
  let response = await fetch(apiEndPoint + "/users/username/" + username, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (response.status !== 404 && response.status !== 500){
    return true;
  } else {
    return false;
  }
}

export async function getStockByProduct(name: string): Promise<number> {
  let response = await fetch(apiEndPoint +"/store/" +name, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

export async function getCanBuyProduct(name: string, amount: number): Promise<boolean> {
  let response = await fetch(apiEndPoint +"/store/" + name + '/' + amount, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();

}

export async function addProductToDistributionCenter(distCenterID: string, productId: string, amount: number): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/productstore/', {
    method: 'POST',
    headers: { authorization: localStorage.getItem("token") + "",'Content-Type': 'application/json' },
    body: JSON.stringify({ 'distCenterID': distCenterID, 'productId': productId, 'amount': amount })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function deleteProductInDistributionCenter(distCenterID: string, productId: string): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/productstore/', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'distCenterId': distCenterID, 'productId': productId })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function updateProductInDistributionCenter(distCenterID: string, productId: string, amount: number): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/productstore/', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'distCenterID': distCenterID, 'productId': productId, 'amount': amount })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}