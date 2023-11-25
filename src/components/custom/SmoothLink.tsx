import React, { FC } from 'react'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath
} from 'reactflow'
import { IData } from '../../types/data'
import { useDispatch, useSelector } from 'react-redux'
import { setData } from '../../redux/slices/graph'
import { METADATA, NONE, SUCCESSFULLY_SELECTED } from '../../constants'
import { enqueueSnackbar } from 'notistack'
import { State } from '../../types/state'
import styles from "../../style/graphText.module.css";

interface SmoothEdgeProps extends EdgeProps {
  sourceX: any
  sourceY: any
  targetX: any
  targetY: any
  sourcePosition: any
  targetPosition: any
  data?: IData
  style?: any
  markerEnd?: string
}

const SmoothEdge: FC<SmoothEdgeProps> = props => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    style = {},
    markerEnd
  } = props
  const { colorText, backgroundColor } = useSelector(
    (state: State) => state.graph
  )
  const [isHovering, setIsHovering] = React.useState(false)
  const dispatch = useDispatch()
  const midX = sourceX + (targetX - sourceX) * 0.5
  const midY = sourceY + (targetY - sourceY) * 0.5
  const edgePath: any = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })

  const onLinkClick = (id: string) => {
    if(data?.label === NONE) return;
    dispatch(setData(id))
    enqueueSnackbar(SUCCESSFULLY_SELECTED, { variant: 'success' })
  }

  return (
    <g
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onLinkClick(id)}
    >
      <BaseEdge path={edgePath.join(' ')} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        {isHovering && data?.label !== NONE && (
          <div
            className={styles.tooltipTextLink}
            style={{
              left: midX + 20,
              top: midY - 20,
              background: colorText,
              color: backgroundColor
            }}
          >
            <div>label: {data?.label}</div>
            {METADATA.map((item: string, index: number) => {
              return (
                <div key={index}>
                  {item.replace('_', ' ')}: {data?.metadata?.[item]}
                </div>
              )
            })}
            <div>
              text: {data?.text?.slice(0, 200)}...{data?.text?.slice(-100)}
            </div>
          </div>
        )}
      </EdgeLabelRenderer>
    </g>
  )
}

export default SmoothEdge
