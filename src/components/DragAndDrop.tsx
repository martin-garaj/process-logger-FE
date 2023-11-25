import { FC, useCallback } from 'react'
import styles from '../style/dragAndDrop.module.css'
import { Box, Modal } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import { State } from '../types/state'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

interface DragDropProps {
  open: boolean
  handleClose: (data: string) => void
}

const DragDrop: FC<DragDropProps> = props => {
  const {colorText} = useSelector((state: State) => state.graph);
  const { open, handleClose } = props

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const textContent = new TextDecoder().decode(arrayBuffer);
        handleClose(textContent);
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <div {...getRootProps()} className={styles.dragAndDrop}>
          <input {...getInputProps()} />
          <p style={{ color: colorText, padding: 15 }}>Drag 'n' drop file here, or click to select file</p>
        </div>
      </Box>
    </Modal>
  )
}

export default DragDrop
