import api from "../lib/axios";
import { IGraph } from "../types/graph";
import { IParsedText } from "../types/parsedText";

class ParserService {
  static parser = (data: IParsedText): Promise<IGraph> => api.post('/parser', data);
}

export default ParserService;