import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import makeAddTaskUseCase from "./addTask";

import makeTask from "../../../domain/entities/task";
import { ITaskRepository } from "./repositories/task/ITaskRepository";
import taskToObject from "../../mappers/task";
import { ITask } from "../../../domain/entities/task/ITask";

describe("addTask Use Case", () => {
  let mockTaskRepository: jest.Mocked<ITaskRepository>;
  let addTask: (taskData: Partial<ITask>) => Promise<ITask>;

  beforeEach(() => {
    // Création d'un mock du repository
    mockTaskRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      findAll: jest.fn(),
    };

    // Instancier le use case avec le mock
    addTask = makeAddTaskUseCase({ taskRepository: mockTaskRepository });
  });

  it("should add a new task", async () => {
    const taskData = {
      id: "123",
      title: "Acheter du lait",
      description: "Aller au supermarché",
    };
    const newTask = makeTask(taskData);
    const taskDTO = taskToObject(newTask); // Convertit en objet

    mockTaskRepository.findById.mockResolvedValue(null); // Simule une tâche inexistante
    mockTaskRepository.create.mockResolvedValue(taskDTO); // Simule la création réussie

    const result = await addTask(taskData);

    expect(mockTaskRepository.findById).toHaveBeenCalledWith(newTask.getId());
    expect(result).toEqual(taskDTO);
  });

  it("should throw an error if a task already exists", async () => {
    const taskData = { title: "Acheter du lait", description: "Supermarché" };
    const existingTask = makeTask(taskData);
    const toObject = taskToObject(existingTask);

    mockTaskRepository.findById.mockResolvedValue(toObject); // Simule une tâche existante

    await expect(addTask(taskData)).rejects.toThrow("Duplicate task");

    expect(mockTaskRepository.findById).toHaveBeenCalled();
    expect(mockTaskRepository.create).not.toHaveBeenCalled(); // Ne doit pas appeler create
  });

  it("should throw an error for invalid data", async () => {
    const invalidTaskData = { id: "", title: "", description: "" };

    await expect(addTask(invalidTaskData)).rejects.toThrow(); // Erreur de validation

    expect(mockTaskRepository.findById).not.toHaveBeenCalled();
    expect(mockTaskRepository.create).not.toHaveBeenCalled();
  });
});
