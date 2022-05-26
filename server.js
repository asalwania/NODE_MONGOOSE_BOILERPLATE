const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! Shutting down...");
    console.error(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DB_URI.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then((con) => console.log("Database Connected....."));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(
        `server is running in (${process.env.NODE_ENV}) enviroment at http://localhost:${PORT}`
    );
});

process.on(`unhandledRejection`, (err) => {
    console.error(err.name, err.message);
    console.log("UNHANDLED REJECTION! Shutting down...");
    server.close(() => {
        process.exit(1);
    });
});
// vid 121 to 123................................
