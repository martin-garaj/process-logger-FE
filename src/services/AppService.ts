import { GRAPH_DATA, MODE } from "../constants";
import { IGraph } from "../types/graph";

class AppService {
  static setMode = (mode: string): void => window.localStorage.setItem(MODE, mode);

  static setGraphData = (data: IGraph): void => window.localStorage.setItem(GRAPH_DATA, JSON.stringify(data));

  static getGraphData = (): IGraph => {
    const data = window.localStorage.getItem(GRAPH_DATA);
    return data ? JSON.parse(data) : null;
  }

  static getMode = (): string | null => window.localStorage.getItem(MODE);
}

export default AppService;