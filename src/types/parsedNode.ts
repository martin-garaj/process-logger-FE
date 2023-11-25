import { IAttribute } from "./attribute";
import { IData } from "./data";

export interface IParsedNode {
  pos?: number[];
  id: string | string[];
  mode: string;
  category: string;
  attributes: IAttribute;
  data: IData;
}