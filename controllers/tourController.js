exports.checkId = (req, res, next, val) => {
    // find tour with id exitst or not
    console.log(`Tour id is ${val}`);
    next();
};

exports.checkBody = (req, res, next) => {
    console.log("Body of req is ", req.body);
    next();
};

exports.getAllTours = (req, res) => {
    console.log("from route handler => ", req.body);
    res.status(200).json({
        status: "sucess",
        results: 1,
        data: [{ name: "Ajay", age: 30 }],
    });
};

exports.getTour = (req, res) => {
    //
};

exports.createTour = (req, res) => {
    //
};

exports.updateTour = (req, res) => {
    //
};

exports.deleteTour = (req, res) => {
    //
};
