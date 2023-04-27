const UserModel = require("../models/userModel");
const {
  verifyToken,
  verifyTokenAndAuthorization
} = require("../midleWares/verifyToken");

const userRouter = require("express").Router();

//UPDATE
userRouter.put("/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});



//GET USER
userRouter.get("/:id",  async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { password, ...userdata } = user._doc;
    res.status(200).json(userdata);
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports =userRouter;