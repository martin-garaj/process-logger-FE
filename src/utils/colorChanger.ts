import {
  BLACK,
  MODE_NODE,
  MODE_PHASE,
  MODE_SHORT,
  MODE_STRAIGHT,
  ORANGE,
  PHASE
} from '../constants'
import { ILink } from '../types/link'
import { INode } from '../types/node'

export const changeNodeColor = (
  nodes: INode[],
  textColor: string,
  isActive?: string
): INode[] => {
  const updatedNodes: INode[] = nodes.map((node: INode) => {
    let updatedNode: INode = { ...node }
    switch (node.mode) {
      case MODE_PHASE:
        updatedNode.style = {
          ...updatedNode.style,
          backgroundColor: textColor
        }
        break
      case MODE_NODE:
        updatedNode.style = {
          ...updatedNode.style,
          border:
            isActive === node.id
              ? `4px solid ${textColor}`
              : textColor === BLACK
              ? '2px solid white'
              : '2px solid black'
        }
        break
      case undefined:
        if (node.id.includes(PHASE)) {
          updatedNode.style = {
            ...updatedNode.style,
            color: textColor
          }
        }
        break
      default:
        break
    }

    return updatedNode
  })

  return updatedNodes
}

export const changeLinkColor = (
  links: ILink[],
  colorText: string,
  isActive?: string
): ILink[] => {
  const updatedLinks: ILink[] = links.map((link: ILink) => {
    let updatedLink: ILink = { ...link }

    if (link.mode && link.mode === MODE_SHORT) {
      updatedLink.style = {
        ...updatedLink.style,
        stroke: isActive === link.id ? ORANGE : colorText
      }
    } else if (link.type === MODE_STRAIGHT) {
      updatedLink.style = {
        ...updatedLink.style,
        stroke: colorText
      }
    }

    return updatedLink || link
  })

  return updatedLinks
}
