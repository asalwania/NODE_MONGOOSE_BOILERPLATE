const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// middlewares
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//     console.log("hello from middleware");
//     // console.log(x)
//     next();
// });

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// handle unknown routes
app.all("*", (req, res, next) => {
    // res.status(404).json({
    //     status: "fail",
    //     message: `Can't find ${req.originalUrl}`,
    // });

    // const err = new Error(`Can't find ${req.originalUrl}`);
    // err.status = "fail";
    // err.statusCode = 404;
    // next(err);

    next(new AppError(`Can't find ${req.originalUrl} on this server )-:`, 404));
});

// globle error handling
app.use(globalErrorHandler);

module.exports = app;

// vid 61................................
