import express from "express";
import env from "./env";
import { taskRouter } from "./adapters/http/routes";
import { makeDb } from "./infra/data/config";

const app = express();
const port = env.PORT || 3001;

app.use(express.json());

app.use("/task", taskRouter);

app.listen(port, async () => {
  await makeDb();
  console.log(`Listening to ${port}`);
});
