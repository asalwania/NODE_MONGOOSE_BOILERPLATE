exports.getAllUsers = (req, res) => {
    console.log("from route handler => ", req.body);
    res.status(200).json({
        status: "sucess",
        results: 1,
        data: [{ name: "Ajay", age: 30 }],
    });
};

exports.getUser = (req, res) => {
    //
};

exports.createUser = (req, res) => {
    //
};

exports.updateUser = (req, res) => {
    //
};

exports.deleteUser = (req, res) => {
    //
};
