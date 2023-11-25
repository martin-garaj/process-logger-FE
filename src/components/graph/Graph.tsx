import { FC, useEffect, useMemo, useState } from 'react'
import ReactFlow, {
  Background,
  ReactFlowProvider,
  useReactFlow,
  Controls,
  PanOnScrollMode
} from 'reactflow'
import 'reactflow/dist/style.css'
import useMediaQuery from '@mui/material/useMediaQuery'
import StepLink from '../custom/StepLink'
import SmoothLink from '../custom/SmoothLink'
import TooltipNode from '../custom/TooltipNode'
import { useSelector } from 'react-redux'
import { State } from '../../types/state'
import styles from '../../style/graphSide.module.css'
import {
  CATEGORY_TRESHHOLD,
  CHANGE_WIDTH,
  CLASSIC_WIDTH_WINDOW,
  DEFAULT_ZOOM,
  SMALL_WIDTH_WINDOW,
  START_Y
} from '../../constants'

const nodeTypes = {
  tooltip: TooltipNode
}

const edgeTypes = {
  tooltip: StepLink,
  smooth: SmoothLink
}

const Graph: FC = () => {
  const { nodes, links, colorText, viewY, graph, viewX, activeId } =
    useSelector((state: State) => state.graph)
  const [previousPhaseY, setPreviousPhaseY] = useState<number>(0)
  const query = useMediaQuery('(max-width:700px)')
  const { setCenter } = useReactFlow()

  const calculateZoomWithViewport = (viewportWidth: number) => {
    if (query) return DEFAULT_ZOOM
    const categoryLen = graph.graph_data.category_list.length

    const zoomLevels = [0.82, 0.68, 0.55, 0.43, 0.38, 0.3]
    const ratio =
      viewportWidth > CHANGE_WIDTH
        ? viewportWidth / CLASSIC_WIDTH_WINDOW
        : viewportWidth / SMALL_WIDTH_WINDOW

    for (let i = 0; i < CATEGORY_TRESHHOLD.length; i++) {
      if (categoryLen <= CATEGORY_TRESHHOLD[i]) {
        return zoomLevels[i] * ratio
      }
    }

    const zoom = zoomLevels[zoomLevels.length - 1] * ratio
    return zoom
  }

  const setPhase = (yCord: number) => {
    setCenter(viewX, yCord + 300, {
      zoom: query ? DEFAULT_ZOOM : calculateZoomWithViewport(window.innerWidth),
      duration: 800
    })
  }

  useEffect(() => {
    if (previousPhaseY !== viewY) {
      setPhase(viewY)
      setPreviousPhaseY(viewY)
    }
  }, [viewY, calculateZoomWithViewport])

  useEffect(() => {
    if (activeId === '') {
      setPhase(START_Y)
    }
  }, [nodes, links])

  const renderedGraph = useMemo(() => {
    return (
      <ReactFlow
        nodes={nodes}
        edges={links}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable={false}
        preventScrolling={query}
        zoomOnPinch={query}
        panOnScroll={true}
        onlyRenderVisibleElements={query}
        zoomOnDoubleClick={query}
        zoomOnScroll={query}
        minZoom={0.1}
        panOnScrollMode={
          query ? ('free' as PanOnScrollMode) : ('vertical' as PanOnScrollMode)
        }
        panOnDrag={query}
        style={{ height: '100%', width: '100%' }}
      >
        <Background color={colorText} />
        <Controls onFitView={() => setPhase(START_Y)} />
      </ReactFlow>
    )
  }, [nodes, links, colorText, query, setPhase])

  return (
    <>
      <div className={styles.basicStyles}>
        {graph.graph_data.category_list.length > 0 && renderedGraph}
      </div>
    </>
  )
}

export default () => (
  <ReactFlowProvider>
    <Graph />
  </ReactFlowProvider>
)
