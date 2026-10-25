import "dotenv/config";
import SubSpace from "./SubSpace.js";

const app = SubSpace.getInstance();
app.init();

try {
  await app.run();
} catch (err) {
  console.error(err);
}
