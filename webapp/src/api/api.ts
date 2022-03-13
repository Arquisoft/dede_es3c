import {User} from '../shared/shareddtypes';

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
    //localStorage.setItem("token", JSON.stringify(response.json));
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
  let response = await fetch(apiEndPoint+'/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'username': username, 'password': password, 'email':email})
    });
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