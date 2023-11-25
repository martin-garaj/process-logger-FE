import React, { FC, ReactNode, useEffect } from 'react'
import SideBar from './sideBar/sideBar'
import {
  Theme,
  ThemeProvider,
  createTheme,
  responsiveFontSizes
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { setColors, setGraph } from '../redux/slices/graph'
import { BLACK, COMPANY_NAME, WHITE } from '../constants'
import AppService from '../services/AppService'

interface LayoutProps {
  children?: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false)
  const dispatch = useDispatch();
  const lightTheme = createTheme()
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })
  let theme: Theme = isDarkMode ? darkTheme : lightTheme
  theme = responsiveFontSizes(theme)

  const handleMode = () => {
    setIsDarkMode(!isDarkMode)
    const backgroundColor = !isDarkMode === true ? BLACK : WHITE;

    AppService.setMode(backgroundColor);
    dispatch(setColors(backgroundColor));
  }

  useEffect(() => {
    const backgroundColor = AppService.getMode();
    const graph = AppService.getGraphData();

    if(backgroundColor && graph && graph.nodes && graph.links) {
      setIsDarkMode(backgroundColor === BLACK ? true : false);
      dispatch(setColors(backgroundColor));
      dispatch(setGraph(graph));
    }
  }, []); 

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: theme.palette.background.default }}>
        <SideBar mode={isDarkMode} handleMode={handleMode} />
      </div>
      <div>
        {children}
      </div>
      <style>
        {`
          body {
            background-color: ${isDarkMode ? BLACK : WHITE};
          }
        `}
      </style>
    </ThemeProvider>
  )
}

export default Layout
