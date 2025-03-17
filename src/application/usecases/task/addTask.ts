// /src/application/usecases/task/addTask.ts
import makeTask from "../../../domain/entities/task";
import { ITask } from "../../../domain/entities/task/ITask";
import taskToObject from "../../mappers/task";
import { ITaskRepository } from "./repositories/task/ITaskRepository";

export default function makeAddTaskUseCase({
  taskRepository,
}: {
  taskRepository: ITaskRepository;
}): (taskData: Partial<ITask>) => Promise<ITask> {
  return async function addTask(taskData: Partial<ITask>) {
    const task = makeTask(taskData);

    // Verifie si la tâche existe dans la bdd
    const exists = await taskRepository.findById(task.getId());
    if (exists) {
      throw new Error(`Duplicate task`);
    }
    // Periste la nouvelle tâche
    const taskDTO = taskToObject(task);
    const result = await taskRepository.create(taskDTO);
    return result;
  };
}
