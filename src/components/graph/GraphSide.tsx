import React, { FC, useEffect, useMemo } from 'react'
import Graph from './Graph'
import styles from '../../style/graphText.module.css'
import graphSideStyles from '../../style/graphSide.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { calculateEntries, calculatePhases } from '../../utils/graphCalculator'
import { State } from '../../types/state'
import { INode } from '../../types/node'
import { END, PHASE } from '../../constants'
import { setView } from '../../redux/slices/graph'

const GraphSide: FC = props => {
  const {
    nodes,
    graph,
    colorText,
    heightShortcuts,
    fontSizeShortcuts,
    backgroundColor,
    clicked
  } = useSelector((state: State) => state.graph)
  const [phaseNodes, setPhaseNodes] = React.useState<INode[]>([])
  const [clickedPhase, setClickedPhase] = React.useState<string>('')
  const dispatch = useDispatch()

  useEffect(() => {
    const _phaseNodes: INode[] = []
    nodes.forEach(node => {
      if (
        node.id.includes(PHASE) &&
        node.data.label.includes(PHASE) &&
        node.data.text === undefined
      ) {
        _phaseNodes.push(node)
      }
    })
    setPhaseNodes(_phaseNodes)
  }, [nodes])

  const viewHandler = (x: number, y: number) => {
    dispatch(setView({ x: x, y: y }))
  }

  const clickedShortcut = (phaseNode: INode) => {
    const { x, y } = phaseNode.position
    viewHandler(x, y)
    setClickedPhase(phaseNode.id)
  }

  const renderPhaseShortcuts = () => {
    return phaseNodes.map((phaseNode, index) => {
      return (
        <div
          key={index}
          className={styles.phaseShortcut}
          style={{
            color: clickedPhase === phaseNode.id ? backgroundColor : colorText,
            backgroundColor:
              clickedPhase === phaseNode.id ? colorText : backgroundColor,
            height: heightShortcuts,
            fontSize: fontSizeShortcuts
          }}
          onClick={() => clickedShortcut(phaseNode)}
        >
          <p style={{ marginLeft: 5 }}>
            {phaseNode.data.label.replace(`${PHASE}.`, '').replace(END, '')}
          </p>
        </div>
      )
    })
  }

  const renderedPhaseShortcuts = useMemo(() => {
    return renderPhaseShortcuts();
  }, [nodes, clicked, phaseNodes]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '80.5vh' }}>
          {renderedPhaseShortcuts}
        </div>
        <div className={styles.graph}>
          <Graph />
        </div>
      </div>
      <div className={graphSideStyles.bottomTextDivWrapper}>
        <div
          className={graphSideStyles.bottomTextDivText}
          style={{ color: colorText }}
        >
          <p className={graphSideStyles.text}>
            phases: {calculatePhases(nodes)}
          </p>
          <p className={graphSideStyles.text}>
            steps: {graph.graph_data.category_list.length}
          </p>
          <p className={graphSideStyles.text}>
            entries: {calculateEntries(nodes)}
          </p>
        </div>
      </div>
    </>
  )
}

export default GraphSide
