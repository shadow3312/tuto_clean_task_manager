// src/domain/entities/task/ITask.ts

export interface ITask {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  createdAt?: number;
}

export interface ITaskEntity {
  getId: () => string;
  getTitle: () => string;
  getDescription: () => string;
  isCompleted: () => boolean;
  getCreatedAt: () => number;
  markAsCompleted: () => void;
  update: (updates: Partial<ITask>) => void;
}
