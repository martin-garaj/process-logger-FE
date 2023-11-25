import { MODE_NODE, MODE_PHASE, SECOND, SECOND_NODE } from "../constants";
import { INode } from "../types/node";

export const calculateEntries = (nodes: INode[]): number => {
  const entries = nodes.filter((node) => node.mode === MODE_NODE && !node.id.includes(SECOND_NODE));
  return entries.length;
}

export const calculatePhases = (nodes: INode[]): number => {
  const phases = nodes.filter((node) => node.mode === MODE_PHASE && !node.id.includes(SECOND));
  return phases.length;
}