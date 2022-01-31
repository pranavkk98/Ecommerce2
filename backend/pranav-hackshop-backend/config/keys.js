const devKeys = require("./devKeys");
const prodKeys = require("./prodKeys");

if (process.env.NODE_ENV === "PROD") {
  keys = prodKeys;
} else {
  keys = devKeys;
}

module.exports = keys;
