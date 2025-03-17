import { ITaskRepository } from "../../../../application/usecases/task/repositories/task/ITaskRepository";
import { ITask } from "../../../../domain/entities/task/ITask";
import { IModels } from "../../config/IConfig";

export default function makeTaskRepository({ models }: { models: IModels }) {
  const model = models.Task;

  return Object.freeze<ITaskRepository>({
    findAll,
    findById,
    create,
    update,
    remove,
  });

  async function findAll() {
    try {
      const instances = await model.findAll();
      const data = instances.map((instance: any) => instance.toJSON());
      return data;
    } catch (error) {
      throw new Error(`Failed to find all tasks ${error}`);
    }
  }

  async function findById(taskId: string) {
    try {
      const instance = await model.findByPk(taskId);
      return instance ? instance.toJSON() : null;
    } catch (error) {
      throw new Error(`Failed to find task by ID`);
    }
  }

  async function create(data: ITask) {
    try {
      const instance = await model.create(data);
      return instance.toJSON();
    } catch (error) {
      throw new Error(`failed to create task: ${error}`);
    }
  }

  async function update(taskId: string, data: Partial<ITask>) {
    try {
      const instance = await model.findByPk(taskId);

      if (!instance) {
        throw new Error(`task not found.`);
      }
      const updatedInstance = await instance.update(data);

      return updatedInstance.toJSON();
    } catch (error) {
      throw new Error(`Failed to update: ${error}`);
    }
  }

  async function remove(taskId: string) {
    try {
      const instance = await model.findByPk(taskId);
      if (!instance) {
        throw new Error("Not found");
      }
      await instance.destroy();
    } catch (error) {
      throw new Error(`Failed to remove task: not found.`);
    }
  }
}
