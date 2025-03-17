import { Optional, DataTypes, Model, Sequelize } from "sequelize";
import { ITask } from "../../../domain/entities/task/ITask";

interface TaskCreationAttributes extends Optional<ITask, "id"> {}

export class Task
  extends Model<ITask, TaskCreationAttributes>
  implements ITask
{
  declare id: string;
  declare title: string;
  declare description: string;
  declare completed: boolean;
  declare createdAt: number;
}

export function initializeTask(sequelize: Sequelize): typeof Task {
  Task.init(
    {
      id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Tasks",
      timestamps: false,
    }
  );

  return Task;
}
