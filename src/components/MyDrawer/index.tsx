import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'

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
            <ListItemIcon>
              <ListItemText>Agenda</ListItemText>
            </ListItemIcon>
          </ListItem>

          <ListItem divider button>
            <ListItemIcon>
              <ListItemText>Perfil</ListItemText>
            </ListItemIcon>
          </ListItem>

          <ListItem divider button>
            <ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}
