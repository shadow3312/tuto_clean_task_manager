import { addTaskUseCase } from "../../../../application/usecases/task";
import makePostTask from "./post";

const postTask = makePostTask({ addTask: addTaskUseCase });

export { postTask };
