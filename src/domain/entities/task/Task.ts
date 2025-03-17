// src/domain/entities/task/Task.ts
import IIdService from "../../../infra/services/IIdService"; // on importe l'interface (abstraite) et non l'implementation concrete
import { ITask, ITaskEntity } from "./ITask";

export default function buildMakeTask({
  IdService,
}: {
  IdService: IIdService;
}) {
  return function makeTask({
    id = IdService.make(),
    title,
    description,
    completed = false,
    createdAt = Date.now(),
  }: Partial<ITask>): ITaskEntity {
    // validations
    if (!title) throw new Error(`Le titre ne peut pas etre vide`);
    if (!description) throw new Error(`La description est obligatoire`);

    return Object.freeze<ITaskEntity>({
      getId: () => id,
      getTitle: () => title as string,
      getDescription: () => description as string,
      isCompleted: () => completed,
      getCreatedAt: () => createdAt,

      // ajout des comportements métier
      markAsCompleted: () => {
        if (completed) throw new Error(`Cette tache est deja complétée`);
        completed = true;
      },
      update: (updates: Partial<ITask>) => {
        // empêcher la modification d'une tâche déjà complétée
        if (completed) {
          throw new Error(`La tâche n'est plus modifiable`);
        }
        if (updates.title !== undefined) {
          if (!updates.title.trim())
            throw new Error("Le titre ne peut pas être vide.");
          title = updates.title;
        }
        if (updates.description !== undefined) {
          if (!updates.description.trim())
            throw new Error("La description ne peut pas être vide.");
          description = updates.description;
        }
      },
    });
  };
}
