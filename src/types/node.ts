import { Position } from "reactflow";
import { IAttribute } from "./attribute";
import { IData } from "./data";

export interface INode {
  id: string;
  type: string;
  className?: string;
  sourceHandle?: string;
  targetHandle?: string;
  draggable: boolean;
  selectable?: boolean;
  focusable?: boolean;
  isResizable?: boolean;
  start?: boolean;
  position: IPosition;
  data: IData;
  targetPosition?: Position;
  sourcePosition?: Position;
  phase?: string;
  mode?: string;
  style?: any;
  category?: string;
  attributes?: IAttribute;
}

export interface IPosition {
  x: number;
  y: number;
}