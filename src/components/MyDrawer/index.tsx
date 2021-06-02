import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import Link from 'next/link'
import { signOut } from '../../contexts/AuthContext'

export const MyDrawer = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false)

  return (
    <>
      <MenuOpenIcon onClick={() => setOpenDrawer(!openDrawer)} />

      <Drawer
        anchor="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <List>
          <ListItem button>
            <Link href="./schedule">
              <ListItemIcon>
                <ListItemText>Agenda</ListItemText>
              </ListItemIcon>
            </Link>
          </ListItem>

          <ListItem divider button>
            <Link href="./perfil">
              <ListItemIcon>
                <ListItemText>Perfil</ListItemText>
              </ListItemIcon>
            </Link>
          </ListItem>

          <ListItem button onClick={() => signOut()}>
            <ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}
