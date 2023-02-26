const Users = require("../models/user");

exports.getUserList = async (req, res, next) => {
    try {
        const users = await Users.find({});
        if (!users.length) {
          return res.status(404).json({ message: "User list not found" });
        }
        res.json(users);
      } catch (err) {
        res.status(500).json({ message: "Error finding user list" });
      }
};

exports.getSingleUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error finding user' });
    }
  };


exports.createUser = async (req, res, next) => {
    try {
      const user = new Users({
        name: req.body.name,
        surname: req.body.surname,
        picture: req.body.picture,
        sex: req.body.sex,
        dateOfBirth: req.body.dateOfBirth,
        dateOfWorkStart: req.body.dateOfWorkStart,
        typeOfContract: req.body.typeOfContract,
        contractDuration: req.body.contractDuration,
        department: req.body.department,
        numberOfVacationDays: req.body.numberOfVacationDays,
        numberOfFreeDays: req.body.numberOfFreeDays,
        numberOfPaidLeaveDays: req.body.numberOfPaidLeaveDays
      });
      const result = await user.save();
      res.status(201).json(result);
    } catch (err) {
        console.log(err);
      res.status(400).json({ message: "Error creating user" });
    }
  };
  

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;
        const options = { new: true };
    
        const result = await Users.findByIdAndUpdate(userId, updatedData, options);
    
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
    
        res.send(result);
    } catch (err) {
        res.status(400).json({ message: "Error while trying to update user data" });
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const data = await Users.findByIdAndDelete(userId);
    
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }
    
        res.send(`${data?.name} has been deleted from the database.`);
    } catch (err) {
        res.status(400).json({ message: "Error while trying to delete user" });
    }
};
