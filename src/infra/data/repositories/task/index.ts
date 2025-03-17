import { models } from "../../config";
import makeTaskRepository from "./taskRepository";

const taskRepository = makeTaskRepository({ models });

export default taskRepository;
