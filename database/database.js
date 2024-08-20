const mongoose = require("mongoose");
const ServerUrl = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.hih44w0.mongodb.net/book`;

const database = () => {
  mongoose
    .connect(ServerUrl)
    .then((conn) => {
      console.log(`connected to the database ${conn.connection.host}`);
    })
    .catch((err) => console.log(err));
};
module.exports = database;
