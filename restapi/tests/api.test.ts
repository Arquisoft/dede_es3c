import request, { Response } from "supertest";
import express, { Application } from "express";
import * as http from "http";
import bp from "body-parser";
import cors from "cors";
import api from "../src/Api";
import database from "../src/persistence/Database";
import * as crypto from "crypto";

let app: Application;
let server: http.Server;
let adminToken: string;
let clientToken: string;
let userId: string;
let productId: string;
let orderId: string;

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
    password: "123456",
    rol: "Admin",
  };
  const response: Response = await request(app)
    .post("/api/register")
    .send(admin)
    .set("Accept", "application/json");
  adminToken = response.body.toString();

  /**
   * Inicializar token Admin
   */
  const user = {
    username: "Cura",
    email: "Cura@jaja.com",
    password: crypto
      .pbkdf2Sync(
        "123456",
        crypto.randomBytes(16).toString("hex"),
        1000,
        64,
        `sha512`
      )
      .toString(`hex`),
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
      password: crypto
        .pbkdf2Sync(
          "123456",
          crypto.randomBytes(16).toString("hex"),
          1000,
          64,
          `sha512`
        )
        .toString(`hex`),
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
      password: "123456",
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
      password : "LoCo",
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
      password : "123456",
    };
    const response: Response = await request(app).post("/api/login").send(user);
    expect(response.statusCode).toBe(404);
  });

  /**
   * Test that we can list users with a error.
   */
  it("can't be listed, bad rout", async () => {
    const response: Response = await request(app).get("/api/users/list");
    expect(response.statusCode).toBe(404);
  });

  /**
   * This test checks that a specific user cannot be accessed without being a registered user by giving a 403.
   */
  it("search user by unregistered user", async () => {
    const response: Response = await request(app).get(
      "/api/users/username/Dios"
    );
    expect(response.statusCode).toBe(403);
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
      password : "123456",
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
      password : "123456",
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
    expect(response.body[0].username).toBe("LeBron Raymone James Sr.");
  });

  /**
   * Tests that list users without being admin
   */
  it("list users without being admin", async () => {
    const response: Response = await request(app)
      .get("/api/users")
      .set("Accept", "application/json")
      .set("Authorization", String(clientToken));

    expect(response.statusCode).toBe(403);
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
      url: "alguna",
      stock: 10,
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
      name: "Portatil HP ...",
      description: "Un portatil muy bueno",
      price: 600,
      category: "Laptop",
      url: "alguna",
      stock: 10,
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
   * This test checks that a specific product can be accessed without being a registered user by giving a 200.
   */
  it("search product by unregistered user", async () => {
    const response: Response = await request(app).get(
      "/api/products/name/Portatil HP ..."
    );
    expect(response.statusCode).toBe(200);
    productId = response.body[0].id;
  });

  /**
   * This test checks that you cannot list a product that does not exist.
   */
  it("search for a product that does not exist", async () => {
    const response: Response = await request(app)
      .get("/api/products/name/Pizza")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toBe(undefined);
  });

  /**
   * Tests that search by id for a products whose id exists
   */
  it("search by id for a products whose id exists", async () => {
    const response: Response = await request(app)
      .get("/api/products/" + productId)
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that update products as admin
   */
  it("update products as admin", async () => {
    const product = {
      name: "Portatil HP ...",
      description: "Un portatil ya no tan bueno",
      price: 500,
      category: "Laptop",
      url: "alguna",
      stock: 10,
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
      url: "alguna",
      stock: 10,
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
      price: 500,
      category: "Laptop",
      url: "alguna",
      stock: 10,
    };

    const response: Response = await request(app)
      .put("/api/products/" + productId)
      .send(product)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(403);
  });

  /**
   * Tests that delete user without being admin
   */
  it("delete user without being admin", async () => {
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
   * Tests that search by id for a user whose id does not exist
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
   * Test that we can list orders without any error.
   */
  it("can be listed orders", async () => {
    const response: Response = await request(app)
      .get("/api/orders")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that we can list orders with a error.
   */
  it("can't be listed orders", async () => {
    const response: Response = await request(app)
      .get("/api/orders")
      .set("Authorization", String(adminToken));
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that insert a new product as admin.
   */
  it("insert a new orders as admin", async () => {
    const product = {
      name: "Portatil HP ...",
      description: "Un portatil muy bueno",
      price: 600,
      category: "Laptop",
      url: "alguna",
      stock: 10,
    };

    const response: Response = await request(app)
      .post("/api/orders")
      .send(product)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));
    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that search by id for a orders whose id exists
   
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
    const product = {
      name: "Portatil HP ...",
      description: "Un portatil ya no tan bueno",
      price: 500,
      category: "Laptop",
      url: "alguna",
      stock: 10,
    };

    const response: Response = await request(app)
      .put("/api/orders/" + orderId)
      .send(product)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));

    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that update orders without admin
   */
  it("update orders without admin", async () => {
    const product = {
      name: "Portatil HP ...",
      description: "Un portatil ya no tan bueno",
      price: 500,
      category: "Laptop",
      url: "alguna",
      stock: 10,
    };

    const response: Response = await request(app)
      .put("/api/orders/" + orderId)
      .send(product)
      .set("Accept", "application/json")
      .set("Authorization", String(clientToken));

    expect(response.statusCode).toBe(403);
  });

  /**
   * Tests that update orders without user
   */
  it("update orders without user", async () => {
    const product = {
      name: "Portatil HP ...",
      description: "Un portatil ya no tan bueno",
      price: 500,
      category: "Laptop",
      url: "alguna",
      stock: 10,
    };

    const response: Response = await request(app)
      .put("/api/orders/" + orderId)
      .send(product)
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
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(403);
  });
});
