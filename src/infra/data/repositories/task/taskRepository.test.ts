import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import { Sequelize } from "sequelize";
import { makeDb, models } from "../../config";
import taskRepository from "./";
import { ITask } from "../../../../domain/entities/task/ITask";

describe("Task repository", () => {
  let db: Sequelize;
  const taskObject = {
    id: "1",
    title: "Test Task",
    description: "This is a test task",
    completed: false,
    createdAt: 1213893131,
  };

  const taskObject2 = {
    id: "2",
    title: "Another Test Task",
    description: "This is another test task",
    completed: false,
    createdAt: 1213893154,
  };

  beforeEach(async () => {
    db = await makeDb();
  }, 10000);

  afterEach(async () => {
    await models.Task.destroy({ where: {} });
  });

  afterAll(async () => {
    await db.close();
  });

  describe("findAll", () => {
    it("should return all Tasks", async () => {
      await models.Task.create(taskObject);
      await models.Task.create(taskObject2);

      const results = await taskRepository.findAll();

      expect(results).toHaveLength(2);
      expect(results[0]).toEqual(taskObject);
    });
  });

  describe("findByPk", () => {
    it("should return a Task if found", async () => {
      await models.Task.create(taskObject);

      const result = await taskRepository.findById(taskObject.id);

      expect(result).toEqual(taskObject);
    });
    it("should return null if Task not found", async () => {
      const found = await taskRepository.findById("fake");
      expect(found).toBeNull();
    });
  });

  describe("create", () => {
    it("should create a Task", async () => {
      const result = await taskRepository.create(taskObject);

      expect(result).toEqual(taskObject);
    });
  });

  describe("update", () => {
    it("should update an existing Task", async () => {
      const Task = await models.Task.create(taskObject);
      const newData: Partial<ITask> = {
        description: "desc",
      };
      const updatedTask = await taskRepository.update(Task.id, newData);

      expect(updatedTask).toEqual(expect.objectContaining(newData));
    });
  });

  describe("remove", () => {
    it("should remove an existing Task", async () => {
      const task = await models.Task.create(taskObject);

      await taskRepository.remove(task.id);

      const deletedTask = await models.Task.findByPk(task.id);
      expect(deletedTask).toBeNull();
    });
  });
});
