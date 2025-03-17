import IdService from "../../../infra/services/IdService";
import buildMakeTask from "./Task";

const makeTask = buildMakeTask({ IdService });

export default makeTask;
