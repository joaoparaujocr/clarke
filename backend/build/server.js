"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// src/typeorm/data-source.ts
var import_typeorm = require("typeorm");
var import_config = require("dotenv/config");
var appDataSource = new import_typeorm.DataSource(process.env.NODE_ENV === "test" ? {
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  entities: [
    "src/migrations/entities/*.ts"
  ]
} : {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.NODE_ENV === "dev" ? true : false,
  logging: process.env.NODE_ENV === "dev" ? true : false,
  migrationsRun: false,
  ...process.env.NODE_ENV === "dev" ? {
    entities: [
      "src/typeorm/entities/*.ts"
    ],
    migrations: [
      "src/typeorm/migrations/*.ts"
    ]
  } : {
    entities: [
      "src/typeorm/entities/*.js"
    ],
    migrations: [
      "src/typeorm/migrations/*.js"
    ]
  }
});

// src/app.ts
var import_typeorm_fastify_plugin = __toESM(require("typeorm-fastify-plugin"));
var app = (0, import_fastify.default)();
app.register(import_typeorm_fastify_plugin.default, {
  connection: appDataSource
});
app.get("/hello", (req, res) => res.send("Hello world"));

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: 3333
}).then(() => console.log("Server runnning"));
