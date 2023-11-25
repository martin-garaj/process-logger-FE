import React, { FC } from 'react'
import { BaseEdge, EdgeLabelRenderer, EdgeProps } from 'reactflow'
import { IData } from '../../types/data'
import { setData } from '../../redux/slices/graph'
import { useDispatch, useSelector } from 'react-redux'
import { enqueueSnackbar } from 'notistack'
import { NONE, SUCCESSFULLY_SELECTED } from '../../constants'
import { State } from '../../types/state'
import styles from "../../style/graphText.module.css";

interface StepLinkProps extends EdgeProps {
  sourceX: any
  sourceY: any
  targetX: any
  targetY: any
  data?: IData
  style?: any
  markerEnd?: string
}

const StepLink: FC<StepLinkProps> = props => {
  const { id, sourceX, sourceY, targetX, targetY, data, style, markerEnd } =
    props
  const { colorText, backgroundColor } = useSelector(
    (state: State) => state.graph
  )
  const [isHovering, setIsHovering] = React.useState(false)
  const dispatch = useDispatch()
  const midX = sourceX + (targetX - sourceX) * 0.5
  const midY = sourceY + (targetY - sourceY) * 0.5

  const edgePath = `
    M${sourceX},${sourceY}
    L${midX},${sourceY}
    L${midX},${targetY}
    L${targetX},${targetY}
  `
  const onNodeClick = (id: string) => {
    if(data?.label === NONE) return;
    dispatch(setData(id))
    enqueueSnackbar(SUCCESSFULLY_SELECTED, { variant: 'success' })
  }

  return (
    <>
      <g
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ zIndex: 100 }}
        onClick={() => onNodeClick(id)}
      >
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      </g>
      {isHovering && data?.label !== NONE && (
        <EdgeLabelRenderer>
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
            <div>word count: {data?.metadata?.word_count}</div>
            <div>num token: {data?.metadata?.num_token}</div>
            <div>source: {data?.metadata?.source}</div>
            <div>info: {data?.metadata?.info}</div>
            <div>
              text: {data?.text?.slice(0, 200)}...{data?.text?.slice(-100)}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

export default StepLink
