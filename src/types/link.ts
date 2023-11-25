import { IAttribute } from "./attribute";
import { IData } from "./data";

export interface ILink {
  id: string;
  type: string;
  source: string;
  target: string;
  mode?: string;
  animated?: boolean;
  style?: any;
  data: IData;
  attributes?: IAttribute;
}