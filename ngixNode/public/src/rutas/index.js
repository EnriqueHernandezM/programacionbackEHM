const express = require("express");
const { Router } = express;
const index = new Router();
const routIndex = require("../controlador/index");

index.get("/", routIndex);

module.exports = index;
