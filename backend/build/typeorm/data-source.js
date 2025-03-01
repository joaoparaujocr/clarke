"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/typeorm/data-source.ts
var data_source_exports = {};
__export(data_source_exports, {
  appDataSource: () => appDataSource
});
module.exports = __toCommonJS(data_source_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appDataSource
});
