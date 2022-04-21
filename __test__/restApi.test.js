const supertest = require("supertest");
const app = require("../app");

describe("endpoint testing ", () => {

  // should save new items in json file
  // should respond with a json object id that is saved
  // should respond with a 200 status code
  // should return a 400 status code to show there was an user error.
  // should return a json object that contains an error message.


  let id;
  describe("Test get and Post", () => {
    it("Should get all the items from", async () => {
      const response = await supertest(app).get("/");

      expect(response.status).toBe(200);
    });

    test("should pass simple http tests", async () => {
      const response = await supertest(app).post("/store-data").send({
        item: "Buy water",
      });
      // should respond with a 200 status code
      expect(response.statusCode).toBe(200);
      // should save new items in json file
      expect(response.body.id).toBeDefined();
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      console.log("From post we got ", response.body.id);
      id = response.body.id;
    });
  });

  describe("Update Item status", () => {
    test("should pass simple http tests and modify item", async () => {
      const response = await supertest(app).patch(`/modify/${id}`).send({
        item: "finalnd",
        status: "Done",
      });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
});
