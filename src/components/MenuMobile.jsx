import * as React from "react"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import { NavLink } from "react-router-dom"
import ListAltIcon from "@mui/icons-material/ListAlt"
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic"
import PortraitIcon from "@mui/icons-material/Portrait"
import DeblurIcon from "@mui/icons-material/Deblur"
import SecurityIcon from '@mui/icons-material/Security'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import DescriptionIcon from '@mui/icons-material/Description'
import DatasetIcon from '@mui/icons-material/Dataset'

export default function NestedList() {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      <ListItemButton>
        <ListItemIcon>
          <AutoAwesomeMosaicIcon className="text-sky-400" />
        </ListItemIcon>
        <NavLink to="/Manager" className=" font-medium text-gray-500">
          ໜ້າຫລັກຂອງໂປຣແກຣມ
        </NavLink>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <PortraitIcon className=" text-sky-400" />
        </ListItemIcon>
        <NavLink to="./userlogin" className=" font-medium text-gray-500">
          ບັນຊີນຳໃຊ້ລະບົບ
        </NavLink>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SecurityIcon className=" text-sky-400" />
        </ListItemIcon>
        <NavLink to="/settingrole" className=" font-medium text-gray-500">
          ໃຫ້ບົດບາດກັບ User
        </NavLink>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AccountBoxIcon className=" text-sky-400" />
        </ListItemIcon>
        <NavLink to="/DataRoleUser" className=" font-medium text-gray-500">
          ເບິ່ງບົດບາດ User
        </NavLink>
      </ListItemButton>
      <Divider />
      <ListItemButton>
        <ListItemIcon>
          <DescriptionIcon className=" text-sky-400" />
        </ListItemIcon>
        <NavLink to="/RegisterUser" className=" font-medium text-gray-500">
          ບັນທຶກຂໍ້ມູນໂປຣໄຟຣ
        </NavLink>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ListAltIcon className=" text-sky-400" />
        </ListItemIcon>
        <NavLink to="/UserList" className=" font-medium text-gray-500">
          ລາຍງານຂໍ້ມູນໂປຣໄຟຣ
        </NavLink>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DatasetIcon className=" text-sky-400" />
        </ListItemIcon>
        <NavLink to="/rolename" className=" font-medium text-gray-500">
          ສະຖານະບົດບາດ
        </NavLink>
      </ListItemButton>
      <Divider />
      <ListItemButton>
        <ListItemIcon>
          <DeblurIcon className=" text-sky-400" />
        </ListItemIcon>
        <NavLink to="/Province" className=" font-medium text-gray-500">
          ລາຍງານຂໍ້ມູນ ແຂວງ
        </NavLink>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DeblurIcon className=" text-sky-400" />
        </ListItemIcon>
        <NavLink to="/District" className=" font-medium text-gray-500">
          ລາຍງານຂໍ້ມູນ ເມືອງ, ບ້ານ
        </NavLink>
      </ListItemButton>
    </List>
  )
}
