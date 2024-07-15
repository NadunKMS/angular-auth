const fs = require("fs");
const path = require("path");

const basename = path.basename(__filename);

const controllers = fs
  .readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith(".js"))
  .reduce((acc, file) => {
    const name = path.basename(file, ".js");
    acc[name] = require(`./${file}`);
    return acc;
  }, {});

module.exports = controllers;
