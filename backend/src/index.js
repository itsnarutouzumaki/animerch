import dotenv from "dotenv";
import connectDB from "./db/dbConnect.db.js";
import { app } from "./App.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`⚙️ Server is running at port : ${PORT}`);
});



connectDB()
.then(()=>{
  console.log("MongoDB is connected");
})
.catch((err) => {
  console.log("MONGO db connection failed !!! ", err);
});


