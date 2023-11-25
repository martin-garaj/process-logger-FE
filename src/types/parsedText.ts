import { IGraphData } from "./graphData";
import { IParsedLink } from "./parsedLink";
import { IParsedNode } from "./parsedNode";

export interface IParsedText {
  directed: boolean;
  multigraph: boolean;
  graph: IGraphData;
  nodes: IParsedNode[];
  links: IParsedLink[];
}