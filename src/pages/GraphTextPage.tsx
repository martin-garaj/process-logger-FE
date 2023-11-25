import React from 'react'
import GraphSide from '../components/graph/GraphSide'
import TextSide from '../components/text/TextSide'
import styles from '../style/graphText.module.css'
import DragAndDrop from '../components/DragAndDrop'
import { Button } from '@mui/material'
import ParserService from '../services/ParserService'
import { IParsedText } from '../types/parsedText'
import { IGraph } from '../types/graph'
import { enqueueSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { clearGraph, setGraph } from '../redux/slices/graph'
import AppService from '../services/AppService'
import { BAD_FORMAT_FILE, SUCCESSFULLY_PARSED, UPLOAD_FILE } from '../constants'

const GraphTextPage = () => {
  const dispatch = useDispatch()
  const [openDragAndDrop, setOpenDragAndDrop] = React.useState<boolean>(false)

  const downloadTxtFile = async (inputText: string) => {
    try {
      dispatch(clearGraph())
      const parsedJson: IParsedText = JSON.parse(inputText)
      const _data: IGraph = await ParserService.parser(parsedJson)
      dispatch(setGraph(_data))
      AppService.setGraphData(_data)
      enqueueSnackbar(SUCCESSFULLY_PARSED, { variant: 'success' })
    } catch (error: any) {
      switch (inputText.length > 0) {
        case false:
          enqueueSnackbar(UPLOAD_FILE, { variant: 'error' })
          break
        default:
          enqueueSnackbar(BAD_FORMAT_FILE, { variant: 'error' })
          break
      }
    }
  }

  const handleOpenDragAndDrop = () => {
    setOpenDragAndDrop(true)
  }

  const handleCloseDragAndDrop = (inputText: string) => {
    downloadTxtFile(inputText)
    setOpenDragAndDrop(false)
  }

  return (
    <>
      <div className={styles.wrapperGraphText}>
        <div className={styles.half}>
          <Button
            color='success'
            variant='outlined'
            onClick={handleOpenDragAndDrop}
            className={styles.button}
          >
            Upload File
          </Button>
          <GraphSide />
        </div>
        <div className={styles.half}>
          <TextSide />
        </div>
      </div>
      <DragAndDrop
        open={openDragAndDrop}
        handleClose={handleCloseDragAndDrop}
      />
    </>
  )
}

export default GraphTextPage
