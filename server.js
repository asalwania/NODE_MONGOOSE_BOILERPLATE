const mongoose = require("mongoose");
const dotenv = require("dotenv");

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

app.listen(PORT, () => {
    console.log(
        `server is running in (${process.env.NODE_ENV}) enviroment at http://localhost:${PORT}`
    );
});

// vid 98................................
