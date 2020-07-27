const express = require("express");
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");

console.log("entered...");
router.post(
  "/signup",
  [
    check("name", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("mobile", "Please enter a valid password").isLength({
      min: 10,
    }),
    check("otp", "Please enter valid OTP").isLength({ min: 6, max: 6 }),
  ],
  async (req, res) => {
    console.log("entered async,..........");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, mobile, otp } = req.body;
    try {
      let user = await User.findOne({
        mobile,
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists",
        });
      }

      user = new User({
        name,
        email,
        mobile,
        otp,
      });

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (err) {
      console.log("entered...");
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/login",
  [
    check("mobile", "Please enter a valid mobile").isMobilePhone(),
    check("otp", "Please enter a valid OTP").isLength({
      min: 6,
      max: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { mobile, otp } = req.body;
    try {
      let user = await User.findOne({
        mobile,
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist",
        });

      const isMatch = otp === user.otp ? true : false;
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect OTP !",
        });

      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign({ _id: user._id }, "random");
      console.log(token);
      res.json({ token, user });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);
const classRoom = require("../models/classRooms");
router.post("/insertClassRoom", (req, res) => {
  const { id, name, subject, time, days, instructor } = req.body;
  const classR = new classRoom({ id, name, subject, time, days, instructor });
  classR.save().then((result) => {
    console.log("success", result);
    res.json({ message: "success" });
  });
});
router.get("/getClass", (req, res) => {
  classRoom.find({}, (err, doc) => {
    console.log(doc);
  });
});
module.exports = router;
