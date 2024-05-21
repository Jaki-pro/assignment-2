import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
// function greet(name: string = "Guest"): void {
//   console.log(`Hello, ${name}!`);
// }

// // Calling the function without any arguments
// greet("");
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`app is running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
