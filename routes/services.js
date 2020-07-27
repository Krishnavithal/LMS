const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const Students = require("../models/students");

const requireLogin = require("../middleware/requireLogin");
const classRooms = require("../models/classRooms");

router.get("/getClasses", requireLogin, (req, res) => {
  const user = req.user;
  console.log(user);
  if (user.type === "teacher") {
    classRooms
      .find({ instructor: user.name })
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    var studentSubjects;
    var studentRooms = [];
    Students.findOne({ name: user.name }).then((result) => {
      studentSubjects = result;
      const promises = studentSubjects.subjects.map((x) =>
        classRooms.findOne({ subject: x }).then((result) => {
          studentRooms.push(result);
        })
      );
      Promise.all(promises).then(() => {
        return res.json({ studentRooms });
      });
    });
    console.log(studentRooms);
  }
});

router.post("/editclass", requireLogin, (req, res) => {
  const { id, name, subject, time, days, instructor } = req.body;
  console.log(req.body);
  classRooms.findOne({ id: id }).then((classRoom) => {
    // Students.find({ subjects: classRoom.subject }, (err, doc) => {
    //   //doc.subjects.remove(classRoom.subject);
    //   console.log("hello.......", doc);
    //   if (!doc) {
    //     doc[0].subjects.remove(classRoom.subject);
    //     doc[0].subjects.push(subject);
    //     console.log("removed................", doc[0].subjects);
    //   }
    // });
    classRoom.name = name;
    classRoom.subject = subject;
    classRoom.time = time;
    classRoom.days = days;
    classRoom.instructor = instructor;
    classRoom
      .save()
      .then((result) => {
        if (result) {
          console.log("updated....");
          res.json({ message: "Class updated" });
        } else {
          return res.json({ error: "Error adding class" });
        }
      })
      .catch((err) => console.log(err));
  });
});

router.get("/getclass/:classId", requireLogin, (req, res) => {
  console.log(req.params.classId);
  let noOfstudents = 10;
  classRooms
    .findOne({ id: req.params.classId })
    .then((classData) => {
      console.log(classData.subject);
      Students.countDocuments({ subjects: classData.subject }, (err, doc) => {
        if (err) console.log(err);
        console.log(err);
        console.log(doc);
        noOfstudents = doc;
        if (classData) {
          res.json({ class: classData, noOfstudents: noOfstudents });
        } else {
          return res.status(422).json({ error: "Can't find any class" });
        }
      });
    })
    .catch((err) => console.log(err));
});

router.delete("/deleteclass/:classId", requireLogin, (req, res) => {
  classRooms.findOne({ id: req.params.classId }).then((classRoom) => {
    classRoom
      .remove()
      .then((result) => {
        res.json({ message: "Deleted successfully" });
      })
      .catch((err) => console.log(err));
  });
});

module.exports = router;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFjMmFjZmFhMzAzODUxMjhiZGY4YmMiLCJpYXQiOjE1OTU2OTc1NzB9.gCM16ezF9D6oVR1wPcdowWuYTc_AIaRXec8Sf84ChS4
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFjMmMwM2FhMzAzODUxMjhiZGY4YzIiLCJpYXQiOjE1OTU3MDQyMzF9.empwtL0nxn_arKFC0ceZFGliNqAw6zfKNbNIN9ob-W0
