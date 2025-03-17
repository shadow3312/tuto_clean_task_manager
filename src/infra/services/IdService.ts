import { createId, isCuid } from "@paralleldrive/cuid2";
import IIdService from "./IIdService";

const IdService: IIdService = Object.freeze({
  make: () => {
    const id = createId();
    if (!isCuid(id)) {
      throw new Error(`Invalid ID format`);
    }
    return id;
  },
  isValid: (id: string) => isCuid(id),
});

export default IdService;
