import { FC, useEffect } from 'react'
import { Highlight } from 'prism-react-renderer'
import { useDispatch, useSelector } from 'react-redux'
import { setLineNumbers } from '../../redux/slices/graph'
import { State } from '../../types/state'
import styles from '../../style/textSide.module.css'

interface TextProps {
  textBlock?: string
  formattedText: boolean
}

const Text: FC<TextProps> = props => {
  const { textBlock, formattedText } = props
  const dispatch = useDispatch()
  const { colorText, backgroundColor } = useSelector(
    (state: State) => state.graph
  )

  useEffect(() => {
    const setLines = () => {
      const len = textBlock?.split('\n').length || 0
      dispatch(setLineNumbers(len))
    }
    setLines()
  }, [dispatch, textBlock])

  return (
    <div style={{ height: '79vh', overflow: 'auto' }}>
      {textBlock && textBlock.length > 0 ? (
        formattedText ? (
          <Highlight code={textBlock} language='tsx'>
            {({ tokens, getLineProps, getTokenProps }) => (
              <div
                className={styles.parsedText}
                style={{
                  backgroundColor: backgroundColor,
                  color: colorText
                }}
              >
                {tokens.map((line, i) => {
                  return (
                    <div
                      key={i}
                      {...getLineProps({ line })}
                      style={{ color: colorText, display: 'flex' }}
                    >
                      <div style={{ userSelect: 'none' }}>{i + 1}. </div>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  )
                })}
              </div>
            )}
          </Highlight>
        ) : (
          <div style={{ color: colorText, fontSize: '16px', padding: '10px' }}>
            <p>{textBlock}</p>
          </div>
        )
      ) : (
        <div style={{ color: colorText, fontSize: '16px', padding: '10px' }}>
          <p>1. Select a Node or an Edge</p>
        </div>
      )}
    </div>
  )
}

export default Text
