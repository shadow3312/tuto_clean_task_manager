import { ITask, ITaskEntity } from "../../domain/entities/task/ITask";

export default function taskToObject(task: ITaskEntity): ITask {
  return Object.freeze<ITask>({
    id: task.getId(),
    title: task.getTitle(),
    description: task.getDescription(),
    completed: task.isCompleted(),
    createdAt: task.getCreatedAt(),
  });
}
