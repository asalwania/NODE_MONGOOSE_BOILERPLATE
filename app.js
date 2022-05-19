const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// middlewares
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//     console.log("hello from middleware");
//     next();
// });

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// handle unknown routes
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl}`,
    });
});

module.exports = app;

// vid 61................................
