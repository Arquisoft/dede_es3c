import request, { Response } from "supertest";
import express, { Application } from "express";
import * as http from "http";
import bp from "body-parser";
import cors from "cors";
import api from "../src/Api";
import database from "../src/persistence/Database";

let app: Application;
let server: http.Server;
let adminToken: string;
let clientToken: string;
let userId: string;
let productId: string;
let orderId: string;
//let salt1 = "9b2b2d9c34db64db0d12c255ca57d69f";
//let hash1 = "01c3a89e3d44fed920a456a36821f3234bc2ec9f1730dca89e4dc42161339f4bb36f1aec8512bd72d23b619d43f8a686ee7f0fb10e0caa63e33b3db9c67285ba";
//let salt2 = "9b2b2d9c34db64db0d12c255ca57d69f";
//let hash2 = "01c3a89e3d44fed920a456a36821f3234bc2ec9f1730dca89e4dc42161339f4bb36f1aec8512bd72d23b619d43f8a686ee7f0fb10e0caa63e33b3db9c67285ba";
let pass1 = "123456";
let pass2 = "LoCo";

const order = {
  "user": "Cura@jaja.com",
  "products": [
    {
        "product": {
            "name": "NiSuPu Monitor",
            "description": "It's a bad Monitor",
            "price": 69.96,
            "category": "Monitors",
            "urlPhoto": "https://res.cloudinary.com/dedesktop/image/upload/v1646938754/samples/ecommerce/HP_l9kqjo.jpg"
        },
        "quantity": 5,
        "shippingPrice": 1,
        "distributionCenter": {
            "address": "Calle Valdes Salas, 11, 33007 Oviedo, Asturias"
        },
    }
  ],
  "address": "Calle Uria numero 10"
};

beforeAll(async () => {
  app = express();
  const port: number = 5000;
  const options: cors.CorsOptions = {
    origin: ["http://localhost:3000"],
  };
  const setDB = async (): Promise<boolean> => {
    const databaseName: string = "test";
    if (await database.setDB(databaseName)) {
      console.log(`Database connection established to ${databaseName}`);
      app.set("db", database.getDB());
      return true;
    } else {
      console.log(`Error on database connection to ${databaseName}`);
      return false;
    }
  };
  app.use(cors(options));
  app.use(bp.json());
  await setDB();
  app.use("/api", api);

  server = app
    .listen(port, (): void => {
      console.log("Restapi server for testing listening on " + port);
    })
    .on("error", (error: Error) => {
      console.error("Error occured: " + error.message);
    });

  /**
   * Inicializar token Admin
   */
  const admin = {
    username: "Dios",
    email: "Dios@jaja.com",
    password: pass1,
    rol: "Admin",
  };
  const response: Response = await request(app)
    .post("/api/register")
    .send(admin)
    .set("Accept", "application/json");
  adminToken = response.body.toString();

  /**
   * Inicializar token Client
   */
  const user = {
    username: "Cura",
    email: "Cura@jaja.com",
    password: pass1,
    rol: "Client",
  };
  const response2: Response = await request(app)
    .post("/api/register")
    .send(user)
    .set("Accept", "application/json");
  clientToken = response2.body.toString();
});

afterAll(async () => {
  server.close(); //close the server
});

describe("CRUD Users", () => {
  /**
   * This test checks that a particular user can be accessed as a registered user.
   */
  it("search user by registered user", async () => {
    const response: Response = await request(app)
      .get("/api/users/username/Dios")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe("Dios");
    userId = response.body.id;
  });

  /**
   * Tests that a user can be register
   */
  it("can be register correctly", async () => {
    const user = {
      username: "Jesucristo",
      email: "Jesucristo@jaja.com",
      password: pass1,
      rol: "Admin",
    };
    const response: Response = await request(app)
      .post("/api/register")
      .send(user)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that a user can be register with error
   */
  it("can not be register correctly", async () => {
    const user = {
      username: "Lucifer",
      email: "Lucifer@jaja.com",
      rol: "Admin",
    };
    const response: Response = await request(app)
      .post("/api/register")
      .send(user)
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(500);
  });

  /**
   * login with an existing user
   */
  it("login with an existing user", async () => {
    const user = {
      username: "Dios",
      password: pass1,
    };
    const response: Response = await request(app).post("/api/login").send(user);
    expect(response.statusCode).toBe(200);
  });

  /**
   * login with an existing user with a bad password
   */
  it("login with an existing user with a bad password", async () => {
    const user = {
      username: "Dios",
      password: pass2,
    };
    const response: Response = await request(app).post("/api/login").send(user);
    expect(response.text).toBe('{"error":"Error, la contraseña no coincide"}');
    expect(response.statusCode).toBe(403);
  });

  /**
   * Tests that login with a user that does not exist
   */
  it("login with a user that does not exist", async () => {
    const user = {
      username: "Lucifer",
      password: pass1,
    };
    const response: Response = await request(app).post("/api/login").send(user);
    expect(response.statusCode).toBe(402);
  });

  /**
   * Test that we can list users with a error.
   */
  it("can't be listed, bad route", async () => {
    const response: Response = await request(app).get("/api/users/list");
    expect(response.statusCode).toBe(404);
  });

  /**
   * This test checks that you cannot list a user that does not exist.
   */
  it("search for a user that does not exist", async () => {
    const response: Response = await request(app)
      .get("/api/users/username/ManolitoGafotas:)")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(404);
  });

  /**
   * Wrongly created user, as there is no path
   */
  it("wrongly created user, as there is no path", async () => {
    let username: string = "Pablo";
    let email: string = "gonzalezgpablo@uniovi.es";
    const response: Response = await request(app)
      .post("/api/users/add")
      .send({ name: username, email: email })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(404);
  });

  /**
   * Tests that search by id for a user whose id exists
   */
  it("search by id for a user whose id exists", async () => {
    const response: Response = await request(app)
      .get("/api/users/" + userId)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that update user as admin
   */
  it("update user as admin", async () => {
    const user = {
      username: "Jesucristo",
      email: "ElRedentor@jaja.com",
      password: pass1,
      rol: "Admin",
    };

    const response: Response = await request(app)
      .put("/api/users/" + userId)
      .send(user)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));

    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that update user without being admin
   */
  it("update user without being admin", async () => {
    const user = {
      username: "Jesucristo",
      email: "ElRedentor@jaja.com",
      password: pass1,
      rol: "Admin",
    };

    const response: Response = await request(app)
      .put("/api/users/" + userId)
      .send(user)
      .set("Accept", "application/json")
      .set("Authorization", String(clientToken));

    expect(response.statusCode).toBe(403);
  });

  /**
   * Tests that delete user without being admin
   */
  it("delete user without being admin", async () => {
    const response: Response = await request(app)
      .delete("/api/users/" + userId)
      .set("Accept", "application/json")
      .set("Authorization", String(clientToken));

    expect(response.statusCode).toBe(403);
  });

  /**
   * Tests that delete user as admin
   */
  it("delete user as admin", async () => {
    const response: Response = await request(app)
      .delete("/api/users/" + userId)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));

    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that search by id for a user whose id does not exist
   */
  it("search by id for a user whose id does not exist", async () => {
    const response: Response = await request(app)
      .get("/api/users/123" + userId)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(404);
  });

  /**
   * Tests that get user as admin
   */
  it("get user as admin", async () => {
    const response: Response = await request(app)
      .get("/api/users")
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));

    expect(response.statusCode).toBe(200);
  });

});

describe("products", () => {
  /**
   * Test that we can list products without any error.
   */
  it("can be listed", async () => {
    const response: Response = await request(app)
      .get("/api/products")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that insert a new product as admin.
   */
  it("insert a new product as admin", async () => {
    const product = {
      name: "Portatil HP ...",
      description: "Un portatil muy bueno",
      price: 600,
      category: "Laptop",
      url: "alguna"
    };

    const response: Response = await request(app)
      .post("/api/products")
      .send(product)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that insert a new product without being admin.
   */
  it("insert a new product without being admin", async () => {
    const product = {
      name: "PC normal",
      description: "Un PC normal",
      price: 400,
      category: "PC",
      url: "url"
    };

    const response: Response = await request(app)
      .post("/api/products")
      .send(product)
      .set("Accept", "application/json")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(403);
  });

  /**
   * This test checks that a specific product category can be accessed without being a registered user by giving a 200.
   */
  it("search product category by unregistered user", async () => {
    const response: Response = await request(app).get(
      "/api/products/category/PC"
    );
    expect(response.statusCode).toBe(200);
  });

  /**
   * This test checks that you cannot list a product that does not exist.
   */
  it("search for a product that does not exist", async () => {
    const response: Response = await request(app)
      .get("/api/products/name/Pizza")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(404);
    expect(response.body[0]).toBe(undefined);
  });

  /**
   * Tests that search by id for a products whose not exists by id
   */
  it("search by id for a products whose  not exists by id", async () => {
    const response: Response = await request(app)
      .get("/api/products/" + productId)
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(404);
  });

  /**
   * Tests that update products as admin
   */
  it("update products as admin", async () => {
    const product = {
      name: "Portatil HP ...",
      description: "Un portatil ya no tan bueno",
      price: 350,
      category: "Laptop",
      url: "alguna"
    };

    const response: Response = await request(app)
      .put("/api/products/" + productId)
      .send(product)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));

    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that update products without admin
   */
  it("update products without admin", async () => {
    const product = {
      name: "Portatil HP ...",
      description: "Un portatil ya no tan bueno",
      price: 500,
      category: "Laptop",
      url: "alguna"
    };

    const response: Response = await request(app)
      .put("/api/products/" + productId)
      .send(product)
      .set("Accept", "application/json")
      .set("Authorization", String(clientToken));

    expect(response.statusCode).toBe(403);
  });

  /**
   * Tests that update products without user
   */
  it("update products without user", async () => {
    const product = {
      name: "Portatil HP ...",
      description: "Un portatil ya no tan bueno",
      price: 450,
      category: "Laptop",
      url: "alguna"
    };

    const response: Response = await request(app)
      .put("/api/products/" + productId)
      .send(product)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(403);
  });

  /**
   * Tests that delete product without being admin
   */
  it("delete product without being admin", async () => {
    const response: Response = await request(app)
      .delete("/api/products/" + productId)
      .set("Accept", "application/json")
      .set("Authorization", String(clientToken));

    expect(response.statusCode).toBe(403);
  });

  /**
   * Tests that delete products as admin
   */
  it("delete products as admin", async () => {
    const response: Response = await request(app)
      .delete("/api/products/" + productId)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));

    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that search by id for a product whose id does not exist
   */
  it("search by id for a product whose id does not exist", async () => {
    const response: Response = await request(app)
      .get("/api/products/123" + productId)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(404);
  });
});

describe("orders", () => {
  /**
   * Test that we can list orders as admin without any error.
   */
  it("can be listed orders as admin", async () => {
    const response: Response = await request(app)
      .get("/api/orders")
      .set("Authorization", String(adminToken));
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that we can list orders as client without any error.
   */
   it("can be listed orders as client", async () => {
    const response: Response = await request(app)
      .get("/api/orders")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that we can't list orders with a error. User no authenticated
   */
  it("can't be listed orders", async () => {
    const response: Response = await request(app)
      .get("/api/orders")
    expect(response.statusCode).toBe(403);
  });

  /**
   * Test that insert a new order as admin.
   */
  it("insert a new order as admin", async () => {
    
    const response: Response = await request(app)
      .post("/api/orders")
      .send(order)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));
    expect(response.statusCode).toBe(200);
    orderId = response.body.id;
  });

  /**
   * Test that insert a new order as client.
   */
   it("insert a new order as client", async () => {    

    const response: Response = await request(app)
      .post("/api/orders")
      .send(order)
      .set("Accept", "application/json")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that search by id for a orders whose id exists
   */
  it("search by id for a orders whose id exists", async () => {
    const response: Response = await request(app)
      .get("/api/orders/" + orderId)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));
    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that update orders as admin
   */
  it("update orders as admin", async () => {
    const order1 = {
      user: "prueba@gmail.com"
    };

    const response: Response = await request(app)
      .put("/api/orders/" + orderId)
      .send(order1)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));

    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that update orders without admin
   */
  it("update orders without admin", async () => {
    const order2 = {
      user: "usuario@gmail.com"
    };

    const response: Response = await request(app)
      .put("/api/orders/" + orderId)
      .send(order2)
      .set("Accept", "application/json")
      .set("Authorization", String(clientToken));

    expect(response.statusCode).toBe(403);
  });

  /**
   * Tests that update orders without user
   */
  it("update orders without user", async () => {
    const order3 = {
      user: "ejemplo@gmail.com"
    };

    const response: Response = await request(app)
      .put("/api/orders/" + orderId)
      .send(order3)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(403);
  });

  /**
   * Tests that delete orders without being admin
   */
  it("delete orders without being admin", async () => {
    const response: Response = await request(app)
      .delete("/api/orders/" + orderId)
      .set("Accept", "application/json")
      .set("Authorization", String(clientToken));

    expect(response.statusCode).toBe(403);
  });

  /**
   * Tests that delete orders as admin
   */
  it("delete orders as admin", async () => {
    const response: Response = await request(app)
      .delete("/api/orders/" + orderId)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));

    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that search by id for a orders whose id does not exist
   */
   it("search by id for a orders whose id does not exist", async () => {
    const response: Response = await request(app)
      .get("/api/orders/123" + orderId)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));
    expect(response.statusCode).toBe(404);
  });
});
describe("distribution centers", () => {
  /**
   * Test that we can list distribution centers as client without any error.
   */
  it("can be listed distribution centers as client", async () => {
    const response: Response = await request(app)
      .get("/api/distributioncenters")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that we can list distribution centers as admin without any error.
   */
   it("can be listed distribution centers as admin", async () => {
    const response: Response = await request(app)
      .get("/api/distributioncenters")
      .set("Authorization", String(adminToken));
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that we can list distribution centers by product and quantity.
   */
   it("can be listed distribution centers with enought quantity of a product", async () => {
    const response: Response = await request(app)
      .get("/api/distributioncenters/Portatil HP .../5")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that we can't list distribution centers by product and quantity if product doesn't exist.
   */
   it("can't be listed distribution centers with enought quantity of a product doesn't exist", async () => {
    const response: Response = await request(app)
      .get("/api/distributioncenters/NoExiste/5")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(500);
  });

  /**
   * Test that insert a new distribution center as admin.
   */
  it("insert a new distribution center as admin", async () => {
    const distributioncenter = {
      address: "Calle Ejemplo numero 8"
    };

    const response: Response = await request(app)
      .post("/api/distributioncenters")
      .send(distributioncenter)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that insert a new distribution center without being admin.
   */
  it("insert a new distribution center without being admin", async () => {
    const distributioncenter = {
      address: "Calle Piedra numero 8"
    };

    const response: Response = await request(app)
      .post("/api/distributioncenters")
      .send(distributioncenter)
      .set("Accept", "application/json")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(403);
  });
});

describe("product store", () => {
  /**
   * Test that we can get de max quantity can be bought of a product.
   */
  it("get de max quantity can be bought of a product", async () => {
    const response: Response = await request(app)
      .get("/api/store/Portatil HP ...")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(200);
  });
  /**
   * Test if we can buy a determined quantity of a product.
   */
   it("can buy a determined quantity of a product", async () => {
    const response: Response = await request(app)
      .get("/api/store/Portatil HP .../5")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(200);
  });

  


});
