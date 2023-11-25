const mongoose = require("mongoose");

//connection to database
mongoose.connect("mongodb://localhost:27017/learning-app-easy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
})
.then( (res) => {
  console.log("connected...");
}).catch( e => {
  console.log("Fail to connect to DB");
  console.log(e)
});