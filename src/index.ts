import "dotenv/config";
import cors from "cors";
import express from "express";
import router from "./router";

const app = express();
app.use(express.json());
app.use(cors());

app.use("", router);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
