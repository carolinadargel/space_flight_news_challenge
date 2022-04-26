import express, { json } from "express";
import cors from "cors";
import nodeCron from "node-cron";

import router from "./router.js";
import db from "./models/index.js";
import updateDb from "./scripts/dailycron.js";


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()).use(json()).use(router);

// Start the server
(async function () {
  try {
    db;
    app.listen(PORT, () => {
      console.log(`🚀 Space Flight News server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("🚨 Error when starting server: " + error);
  }
})();

const job = nodeCron.schedule("* 9 * * *", updateDb,
    {
    scheduled: false,
    timezone: "America/Sao_Paulo"
 });
job.start();