import { ITask } from "../../../../domain/entities/task/ITask";
import {
  IHttpError,
  IHttpRequest,
  IHttpResponse,
} from "../../express/IExpress";

export interface IMakeGetAllTasksController {
  listTasks: () => Promise<ITask[]>;
}

export interface IMakePostTaskController {
  addTask: (taskData: Partial<ITask>) => Promise<ITask>;
}

export interface IMakeGetSingleTaskController {
  getTask: (id: string) => Promise<ITask>;
}

export interface IMakePatchTaskController {
  editTask: (id: string, taskData: Partial<ITask>) => Promise<ITask>;
}

export interface IMakeDeleteTaskController {
  removeTask: (id: string) => Promise<void>;
}

export interface ITaskRequest extends IHttpRequest {}

export type ITaskResponse = IHttpResponse | IHttpError;
export type ITaskListResponse = IHttpResponse | IHttpError;
