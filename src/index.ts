import express from "express";
import cors from "cors";
import path from "path";
import formData from "express-form-data";
import { ErrorHandler, NotFound } from "./utils/ErrorHandler.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(formData.parse());

import routing from "./routing.js";
routing(app);

// Production
if (process.env.NODE_ENV === "production") {
  var __dirname = path.resolve();
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Middleware
app.use(NotFound);
app.use(ErrorHandler);

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`RE-Commerce is running now at port ${PORT}!`));
