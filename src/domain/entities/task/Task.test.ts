import { describe, expect, it, jest } from "@jest/globals";
import buildMakeTask from "./Task";

// Mock du service ID
const mockIdService = {
  make: jest.fn(() => "generated-id"),
  isValid: jest.fn((id) => id === "valid-id" || id === "generated-id"),
};

const makeTask = buildMakeTask({ IdService: mockIdService });

describe("Task Entity", () => {
  it("should create a valid task", () => {
    const task = makeTask({
      title: "Acheter du pain",
      description: "Aller à la boulangerie",
    });

    expect(task.getId()).toBe("generated-id");
    expect(task.getTitle()).toBe("Acheter du pain");
    expect(task.getDescription()).toBe("Aller à la boulangerie");
    expect(task.isCompleted()).toBe(false);
    expect(task.getCreatedAt()).toBeDefined();
  });

  it("should throw an error if the title is empty", () => {
    expect(() => makeTask({ title: "", description: "Desc" })).toThrow(
      "Le titre ne peut pas etre vide"
    );
  });

  it("should throw an error if the description is empty", () => {
    expect(() => makeTask({ title: "Titre", description: "" })).toThrow(
      "La description est obligatoire"
    );
  });

  it("should mark a task as completed", () => {
    const task = makeTask({
      title: "Faire du sport",
      description: "Aller à la salle",
    });

    expect(task.isCompleted()).toBe(false);
    task.markAsCompleted();
    expect(task.isCompleted()).toBe(true);
  });

  it("should not complete a already completed task", () => {
    const task = makeTask({
      title: "Faire du sport",
      description: "Aller à la salle",
      completed: false,
    });

    task.markAsCompleted();
    expect(() => task.markAsCompleted()).toThrow(
      "Cette tache est deja complétée"
    );
  });

  it("should update the title and description", () => {
    const task = makeTask({
      title: "Ancien titre",
      description: "Ancienne description",
    });

    task.update({
      title: "Nouveau titre",
      description: "Nouvelle description",
    });

    expect(task.getTitle()).toBe("Nouveau titre");
    expect(task.getDescription()).toBe("Nouvelle description");
  });

  it("should not update a task with an empty title", () => {
    const task = makeTask({
      title: "Ancien titre",
      description: "Ancienne description",
      completed: false,
    });

    expect(() => task.update({ title: "" })).toThrow(
      "Le titre ne peut pas être vide."
    );
  });

  it("should not update a task with an empty description", () => {
    const task = makeTask({
      title: "Ancien titre",
      description: "Ancienne description",
      completed: false,
    });

    expect(() => task.update({ description: "" })).toThrow(
      "La description ne peut pas être vide."
    );
  });

  it("should not update a completed task", () => {
    const task = makeTask({
      title: "Tâche",
      description: "Description",
    });

    task.markAsCompleted();

    expect(() => task.update({ title: "Nouveau titre" })).toThrow(
      "La tâche n'est plus modifiable"
    );
  });
});
