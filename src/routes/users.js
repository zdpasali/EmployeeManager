const { Router } = require('express');

const {
    getUserList,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
  } = require('../controllers/userscrud');
  

const router = Router();

router.get("/userList", getUserList);

router.get("/userInfo/:userId",  getSingleUser);

router.patch("/updateUser/:userId",  updateUser);

router.delete("/deleteUser/:userId",  deleteUser);

router.post("/createUser", createUser);


module.exports = router;