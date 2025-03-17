import { addTaskUseCase } from "../../../../application/usecases/task";
import { ITask } from "../../../../domain/entities/task/ITask";
import { catchError, setJsonReponse } from "../../helpers";
import {
  IMakePostTaskController,
  ITaskRequest,
  ITaskResponse,
} from "./ITaskController";

export default function makePostTask({ addTask }: IMakePostTaskController) {
  return async function postTask(
    httpRequest: ITaskRequest
  ): Promise<ITaskResponse> {
    try {
      const { body } = httpRequest;
      const task = await addTaskUseCase(body as ITask);
      return setJsonReponse({ statusCode: 200, body: task });
    } catch (error) {
      return catchError(error);
    }
  };
}
