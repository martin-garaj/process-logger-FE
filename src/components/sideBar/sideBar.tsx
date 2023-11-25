import {
  Box,
  Drawer,
  FormControlLabel,
  FormGroup,
  List,
  Switch
} from '@mui/material'
import React, { FC } from 'react'
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import styles from '../../style/dragAndDrop.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../types/state'
import { COMPANY_NAME } from '../../constants'

interface SideBarProps {
  handleMode: () => void
  mode: boolean
}

const SideBar: FC<SideBarProps> = props => {
  const { handleMode, mode } = props
  const [openSideBar, setState] = React.useState<boolean>(false)
  const { colorText } = useSelector((state: State) => state.graph)

  const toggleDrawer = (open: boolean) => setState(open)

  const list = () => (
    <Box
      role='presentation'
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
      component={'div'}
    >
      <List>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={mode}
                onChange={() => handleMode()}
                name='darkMode'
              />
            }
            label='Dark Mode'
          />
        </FormGroup>
      </List>
    </Box>
  )

  return (
    <div style={{ height: '100%' }}>
      {(['left'] as const).map(anchor => (
        <React.Fragment key={anchor}>
          <div style={{ display: 'flex' }}>
            <DensityMediumIcon
              onClick={() => toggleDrawer(true)}
              className={styles.icon}
              style={{ color: colorText }}
            />
            <h3 style={{ color: colorText, marginTop: 5, marginLeft: 10 }}>{COMPANY_NAME}</h3>
          </div>
          <Drawer
            anchor={anchor}
            open={openSideBar}
            onClose={() => toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}

export default SideBar
