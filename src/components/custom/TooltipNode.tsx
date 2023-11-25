import { FC, memo, useEffect, useState } from 'react'
import { Handle, Position, NodeToolbar, NodeProps } from 'reactflow' // Make sure to import NodeTypesType
import { IData } from '../../types/data'
import { useDispatch, useSelector } from 'react-redux'
import { setData } from '../../redux/slices/graph'
import styles from '../../style/graphText.module.css'
import { CATEGORY_TRESHHOLD, METADATA } from '../../constants'
import { State } from '../../types/state'
import { INode } from '../../types/node'

interface TooltipNodeProps extends NodeProps {
  data: IData
  sourcePosition?: Position
  targetPosition?: Position
  id: string
}

const TooltipNode: FC<TooltipNodeProps> = props => {
  const { data, sourcePosition, targetPosition, id } = props
  const { nodes, colorText, graph } = useSelector((state: State) => state.graph)
  const [isVisible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const [backgroundColor, setBackgroundColor] = useState<string>('orange')
  const [fontSize, setFontSize] = useState<number>(16)
  const [weigth, setWeigth] = useState<string>('normal')  

  const onNodeClick = (id: string) => {
    dispatch(setData(id))
  }

  useEffect(() => {
    const categoryLen = graph.graph_data.category_list.length;
    const fontSizeLevel = [14, 16, 20, 23, 25]
    const foundNode: INode | undefined = nodes.find(
      (node: INode) => node.id === id
    )
    if (foundNode) {
      for (let i = 0; i < CATEGORY_TRESHHOLD.length; i++) {
        if (categoryLen <= CATEGORY_TRESHHOLD[i]) {
          setFontSize(fontSizeLevel[i]) 
          break;
        }
      }
      if(categoryLen > 7) {
        setWeigth('bold')
      }
      setBackgroundColor(foundNode.style.backgroundColor)
    }
  }, [id])

  return (
    <div
      onClick={() => onNodeClick(id)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div style={{ zIndex: 2, width: '100%!important', fontSize: fontSize, fontWeight: weigth }}>
        <NodeToolbar
          isVisible={isVisible}
          position={'bottom' as Position}
          className={styles.nodeHover}
          style={{ backgroundColor: backgroundColor }}
        >
          <div>
            <div>label: {data?.label}</div>
            {METADATA.map((item: string, index: number) => {
              return (
                <div key={index}>
                  {item.replace('_', ' ')}: {data.metadata?.[item]}
                </div>
              )
            })}
            <div>
              text: {data?.text?.slice(0, 200)}...{data?.text?.slice(-100)}
            </div>
          </div>
        </NodeToolbar>
        <div className={styles.nodeLabel} style={{}}>
          {data.label}
        </div>
        <Handle type='target' position={sourcePosition as Position} />
        <Handle type='source' position={targetPosition as Position} />
      </div>
      <style>
        {`
          .react-flow__node:hover {
            border: 4px solid ${colorText}!important;
          }
        `}
      </style>
    </div>
  )
}

export default memo(TooltipNode)
