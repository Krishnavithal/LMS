const mongoose = require("mongoose");

const MONGOURI =
  "mongodb+srv://Krishna:krishna123@cluster0.8nge8.mongodb.net/LearningManagementSystem?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log("failed..............");
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
