import { IAttribute } from "./attribute";
import { IData } from "./data";

export interface IParsedLink {
  mode: string;
  source: string | string[];
  target: string | string[];
  attribute: IAttribute;
  data: IData
}