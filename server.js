const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("NODE_ENV = ", process.env.NODE_ENV)
    console.log(`server is running at http://localhost:${PORT}`);
});

// vid 65................................
