import React, { FC } from 'react'
import Text from './Text'
import styles from '../../style/graphText.module.css'
import textSideStyles from '../../style/textSide.module.css'
import { useSelector } from 'react-redux'
import { State } from '../../types/state'
import { Button } from '@mui/material'
import { METADATA } from '../../constants'

const TextSide: FC = props => {
  const { data, lineNumbers, colorText } = useSelector(
    (state: State) => state.graph
  )
  const [formattedText, setFormattedText] = React.useState<boolean>(false)

  const formatHandler = () => {
    setFormattedText(!formattedText)
  }

  return (
    <>
      <Button

        variant={formattedText ? 'contained' : 'outlined'}
        onClick={formatHandler}
        color='success'
        className={styles.button}
      >
        Formatting
      </Button>
      <div className={styles.text}>
        <Text textBlock={data.text} formattedText={formattedText} />
      </div>
      <div
        className={textSideStyles.bottomTextDivRightWrapper}
        style={{ color: colorText }}
      >
        {METADATA.map((item: string, index: number) => {
          return (
            <p key={index} className={textSideStyles.text}>
              {item.replace('_', ' ')}: {data.metadata?.[item]}
            </p>
          )
        })}
        <p>lines: {lineNumbers}</p>
      </div>
    </>
  )
}

export default TextSide
