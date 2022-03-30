import {User, Product, Order, Address} from '../shared/shareddtypes';

export async function addUser(user:User):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'username':user.username, 'password': user.password, 'rol': user.rol, 'email':user.email})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getUsers():Promise<User[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}


export async function checkUser(username: string, password: string): Promise<boolean> {
  let response = await fetch("http://localhost:5000/api/users/username/" + username, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}

export async function loginB(username:string ,password:string) {
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'username': username, 'password': password})
    });
    return response.json();
}

export async function signup(username:string ,password:string, email:string) {
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  console.log("antes de la peticion");
  let response = await fetch(apiEndPoint+'/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'username': username, 'password': password, 'email':email, 'rol':"Client"})
    });
    console.log("llega al return");
    return response.json();
}

export async function getUser(username: string): Promise<User> {
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api/users';
  let response = await fetch(apiEndPoint + "/username/" + username, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

export async function getProducts(): Promise<Product[]>{
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/products');
  return response.json()
}

export async function getProductsByName(name: string): Promise<Product[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api/products'
  let response = await fetch(apiEndPoint + '/name/' + name, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json()
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api/products'
  let response = await fetch(apiEndPoint + '/category/' + category, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json()
}

export async function addProduct(product: Product): Promise<boolean>{
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'name': product.name, 'description': product.description, 'price': product.price, 'category': product.category, 'urlPhoto': product.urlPhoto })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function updateProduct(id: string, product: Product): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/products/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'name': product.name, 'description': product.description, 'price': product.price, 'category': product.category, 'urlPhoto': product.urlPhoto })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/products/' + id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'id': id })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function getOrders(): Promise<Order[]>{
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/orders');
  return response.json()
}

export async function getAddress(webID: String): Promise<Address>{
  const apiEndPoint = 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + '/pod', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'name': webID })
  });
    return response.json();
}