// /src/application/repositories/task/ITaskRepository.ts

export interface ITaskRepository {
  // Ici, nous définissons toutes les methodes dont nous auront besoin pour interagir avec la base de données
  findAll: () => Promise<ITask[]>;
  findById: (taskId: string) => Promise<ITask | null>;
  create: (data: ITask) => Promise<ITask>;
  update: (taskId: string, data: Partial<ITask>) => Promise<ITask>;
  remove: (taskId: string) => Promise<void>;
}
