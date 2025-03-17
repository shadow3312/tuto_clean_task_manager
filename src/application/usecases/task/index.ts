import taskRepository from "../../../infra/data/repositories/task";
import makeAddTaskUseCase from "./addTask";

const addTaskUseCase = makeAddTaskUseCase({ taskRepository });

export { addTaskUseCase };
