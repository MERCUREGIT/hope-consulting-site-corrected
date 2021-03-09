const app = require("../server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const db = require("../config/database");


beforeEach((done) => {
  db(mongoose, done);
});

test("Testing all GET request on site", async () => {

  await supertest(app).get("/")
    .expect(200);
  
  await supertest(app).get("/services")
    .expect(200);

  await supertest(app).get("/architectures")
    .expect(200);

  await supertest(app).get("/plans")
    .expect(200);

  await supertest(app).get("/offres-immobilier")
    .expect(200);

  await supertest(app).get("/demandes-immobilier")
    .expect(200);

  await supertest(app).get("/comptabilite")
    .expect(200);

  await supertest(app).get("/candidatures")
    .expect(200);
  
  await supertest(app).get("/candidatures-create")
    .expect(200);
  
  await supertest(app).get("/srfemploi/offre/create").expect(200)
});








afterEach((done) => {
  mongoose.connection.close(()=>done())
  // mongoose.connection.db.dropDatabase(() => {
  //   // mongoose.connection.close(() => done())
  // });
});
