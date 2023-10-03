const Application = require("./app/server");
const DB_URL = "mongodb://127.0.0.1:27017/storeDBboto";

new Application(5000, DB_URL);
