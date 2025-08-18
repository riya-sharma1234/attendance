import app from "./app.js"
import connectDB from "./src/config/database.config.js";
const PORT = process.env.PORT || 9000;

connectDB().then(() => {
  app.listen(PORT , (err) => {
    if (err) {
    console.error("Error starting server:", err);
    process.exit(1)
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
})
.catch((err) => {
    console.log("Error while connecting to database", err)
    process.exit(1)
})
