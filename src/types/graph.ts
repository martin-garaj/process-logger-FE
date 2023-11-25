import { IData } from "./data";
import { IGraphData } from "./graphData";
import { ILink } from "./link";
import { INode } from "./node";

export interface IGraph {
  directed: boolean;
  multigraph: boolean;
  graph: IGraphData;
  nodes: INode[];
  links: ILink[];
  fontSizeShortcuts: number;
  heightShortcuts: number;
}

export interface IGraphStore extends IGraph {
  data: IData;
  colorText: string;
  backgroundColor: string;
  lineNumbers: number;
  activeId: string;
  viewX: number;
  viewY: number;
  clicked: boolean;
}