import request, { Response } from "supertest";
import express, { Application } from "express";
import * as http from "http";
import bp from "body-parser";
import cors from "cors";
import api from "../src/Api";
import database from "../src/persistence/Database";

let app: Application;
let server: http.Server;
let adminToken: String;
let clientToken: String;
let userId: String;

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

  const responseId: Response = await request(app)
    .post("/api/users/username/Dios")
    .send(admin)
    .set("Accept", "application/json")
    .set("Authorization", String(clientToken));
  userId = responseId.body.id;

  /**
   * Inicializar token Admin
   */
  const user = {
    username: "Cura",
    email: "Cura@jaja.com",
    password: "123456",
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
   * Tests that a user can be register
   */
  it("can be register correctly", async () => {
    const user = {
      username: "Jesucristo",
      email: "Jesucristo@jaja.com",
      password: "123456",
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
    console.log(response.text);
  });

  /**
   * login with an existing user with a bad password
   */
  it("login with an existing user with a bad password", async () => {
    const user = {
      username: "Dios",
      password: "LoCo",
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
      password: "123456",
    };
    const response: Response = await request(app).post("/api/login").send(user);
    expect(response.statusCode).toBe(404);
    console.log(response.text);
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
   * This test checks that a particular user can be accessed as a registered user.
   */
  it("search user by registered user", async () => {
    const response: Response = await request(app)
      .get("/api/users/username/Dios")
      .set("Authorization", String(clientToken));
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe("Dios");
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
   * Tests that update user as admin
   */
  it("update user as admin", async () => {
    const user = {
      username: "Jesucristo",
      email: "ElRedentor@jaja.com",
      password: "123456",
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
   * Tests update user that does not exist as admin
   
  it("update user that does not exist as admin", async () => {
    const user = {
      username: "Lucifer",
      email: "Lucifer@jaja.com",
      password: "123456",
      rol: "Admin",
    };
    const response: Response = await request(app)
      .put("/api/users/Lucifer")
      .send(user)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));

    expect(response.statusCode).toBe(500);
  });

  /**
   * Tests that update user without being admin
   */
  it("update user without being admin", async () => {
    const user = {
      username: "Jesucristo",
      email: "ElRedentor@jaja.com",
      password: "123456",
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
   * Tests that delete user as admin
   */
  it("delete user as admin", async () => {
    const user = {
      username: "Jesucristo",
      email: "ElRedentor@jaja.com",
      password: "123456",
      rol: "Admin",
    };
    const response: Response = await request(app)
      .delete("/api/users/" + userId)
      .send(user)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));

    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that delete user without being admin
   */
  it("delete user without being admin", async () => {
    const user = {
      username: "Jesucristo",
      email: "ElRedentor@jaja.com",
      password: "123456",
      rol: "Admin",
    };
    const response: Response = await request(app)
      .delete("/api/users/" + userId)
      .send(user)
      .set("Accept", "application/json")
      .set("Authorization", String(clientToken));

    expect(response.statusCode).toBe(403);
  });

  /**
   * Tests that get user as admin
   
  it("get user as admin", async () => {
    const user = {
      username: "Jesucristo",
      email: "ElRedentor@jaja.com",
      password: "123456",
      rol: "Admin",
    };
    const response: Response = await request(app)
      .get("/api/users/" + userId)
      .send(user)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that get user without being admin
   
  it("get user without being admin", async () => {
    const user = {
      username: "Jesucristo",
      email: "ElRedentor@jaja.com",
      password: "123456",
      rol: "Admin",
    };
    const response: Response = await request(app)
      .get("/api/users/123" + userId)
      .send(user)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(500);
  });

  /**
   * Tests that get user as admin
   */
  it("get user as admin", async () => {
    const user = {
      username: "Jesucristo",
      email: "ElRedentor@jaja.com",
      password: "123456",
      rol: "Admin",
    };
    const response: Response = await request(app)
      .get("/api/users")
      .send(user)
      .set("Accept", "application/json")
      .set("Authorization", String(adminToken));

    expect(response.statusCode).toBe(200);
  });

  /**
   * Tests that list users without being admin
   */
  it("list users without being admin", async () => {
    const user = {
      username: "Jesucristo",
      email: "ElRedentor@jaja.com",
      password: "123456",
      rol: "Admin",
    };
    const response: Response = await request(app)
      .get("/api/users")
      .send(user)
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
});
