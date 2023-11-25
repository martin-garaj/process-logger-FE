import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGraph, IGraphStore } from '../../types/graph'
import storage from 'redux-persist/lib/storage'
import { INode } from '../../types/node'
import { ILink } from '../../types/link'
import { changeLinkColor, changeNodeColor } from '../../utils/colorChanger'
import { BLACK, MODE_PHASE, SECOND, SECOND_NODE, WHITE } from '../../constants'

export const graphPersistConfig = {
  key: 'setting',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
}

const initialState: IGraphStore = {
  directed: false,
  fontSizeShortcuts: 16,
  heightShortcuts: 50,
  multigraph: false,
  graph: {
    version: '',
    date: '',
    graph_data: {
      category_list: []
    }
  },
  nodes: [],
  links: [],
  data: {
    label: '',
    text: '',
    metadata: {
      word_count: 0,
      num_token: 0,
      source: '',
      info: ''
    }
  },
  activeId: '',
  colorText: BLACK,
  backgroundColor: WHITE,
  lineNumbers: 0,
  viewX: 50,
  viewY: 200,
  clicked: false
}

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setGraph: (state: IGraphStore, action: PayloadAction<IGraph>) => {
      const newNodes = changeNodeColor(action.payload.nodes, state.colorText);
      const newLinks = changeLinkColor(action.payload.links, state.colorText);
      const phaseSecond = newNodes.find(node => node.id.includes(SECOND) && node.mode === MODE_PHASE);
      return {
        ...state,
        viewX: phaseSecond ? phaseSecond.position.x / 2 : 270,
        directed: action.payload.directed,
        multigraph: action.payload.multigraph,
        graph: action.payload.graph,
        nodes: newNodes,
        links: newLinks,
        fontSizeShortcuts: action.payload.fontSizeShortcuts,
        heightShortcuts: action.payload.heightShortcuts
      }
    },
    setColors: (state: IGraphStore, action: PayloadAction<string>) => {
      const backgroundColor = action.payload;
      const colorText = action.payload === BLACK ? WHITE : BLACK;
      const newNodes = changeNodeColor(state.nodes, colorText)
      const newLinks = changeLinkColor(state.links, colorText)
      return {
        ...state,
        backgroundColor,
        colorText,
        nodes: newNodes,
        links: newLinks
      }
    },
    setLineNumbers: (state: IGraphStore, action: PayloadAction<number>) => {
      return {
        ...state,
        lineNumbers: action.payload
      }
    },
    setData: (state: IGraphStore, action: PayloadAction<string>) => {

      let foundData: any = state.nodes.find(node => node.id === action.payload)
      if(!foundData) foundData = state.links.find(link => link.id === action.payload)
      const newNodes = changeNodeColor(state.nodes, state.colorText, action.payload)
      const newLinks = changeLinkColor(state.links, state.colorText, action.payload)
      return {
        ...state,
        data: {
          label: foundData?.data?.label || '',
          text: foundData?.data?.text || '',
          metadata: {
            word_count: foundData?.data?.metadata?.word_count || 0,
            num_token: foundData?.data?.metadata?.num_token || 0,
            source: foundData?.data?.metadata?.source || '',
            info: foundData?.data?.metadata?.info || ''
          }
        },
        nodes: newNodes,
        links: newLinks,
        activeId: action.payload
      }
    },
    setNodes: (state: IGraphStore, action: PayloadAction<INode[]>) => {
      return {
        ...state,
        nodes: action.payload
      }
    },
    setLinks: (state: IGraphStore, action: PayloadAction<ILink[]>) => {
      return {
        ...state,
        links: action.payload
      }
    },
    setActiveId: (state: IGraphStore, action: PayloadAction<string>) => {
      return {
        ...state,
        activeId: action.payload
      }
    },
    setView: (state: IGraphStore, action: PayloadAction<{x: number, y: number}>) => {
      return {
        ...state,
        viewY: action.payload.y,
        clicked: !state.clicked
      }
    },
    clearGraph: (state: IGraphStore) => {
      return {
        ...state,
        nodes: [],
        links: [],
        data: {
          label: '',
          text: '',
          metadata: {
            word_count: 0,
            num_token: 0,
            source: '',
            info: ''
          }
        },
        activeId: '',
        viewX: 50,
        viewY: 200,
        clicked: false
      }
    }
  }
})

export const {
  setGraph,
  setColors,
  setLineNumbers,
  setData,
  setLinks,
  setNodes,
  setActiveId,
  setView,
  clearGraph,
} = graphSlice.actions
export default graphSlice.reducer
