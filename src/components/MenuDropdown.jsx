import * as React from "react"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import Collapse from "@mui/material/Collapse"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { NavLink } from "react-router-dom"
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic"
import PortraitIcon from "@mui/icons-material/Portrait"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import SecurityIcon from "@mui/icons-material/Security"
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount"
import VpnLockIcon from "@mui/icons-material/VpnLock"
import { useNavigate } from "react-router-dom"

export default function NestedList() {
  const [open, setOpen] = React.useState(false)
  const [openrole, setOpenrole] = React.useState(false)
  const [opencountry, setOpencountry] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  const handleRole = () => {
    setOpenrole(!openrole)
  }
  const handleCountry = () => {
    setOpencountry(!opencountry)
  }

  // click NavLink to file menu
  const history = useNavigate()
  const Manager = () => {
    history("/Manager")
  }
  const UserLogin = () => {
    history("/UserLogin")
  }
  const settingrole = () => {
    history("/settingrole")
  }
  const dataroleuser = () => {
    history("/dataroleuser")
  }
  const registeruser = () => {
    history("/registeruser")
  }
  const UserList = () => {
    history("/UserList")
  }
  const historyhome = () => {
    history("/historyhome")
  }
  const Province = () => {
    history("/Province")
  }
  const District = () => {
    history("/District")
  }

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      <ListItemButton onClick={Manager} className="group">
        <ListItemIcon>
          <AutoAwesomeMosaicIcon className="text-sky-400 group-hover:scale-110" />
        </ListItemIcon>
        <NavLink className=" font-medium text-gray-500">
          ໜ້າທຳອິດ ຂອງແອບ
        </NavLink>
      </ListItemButton>
      <ListItemButton onClick={UserLogin} className="group">
        <ListItemIcon>
          <PortraitIcon className=" text-sky-400 group-hover:scale-110" />
        </ListItemIcon>
        <NavLink className=" font-medium text-gray-500">
          ບັນຊີນຳໃຊ້ລະບົບ
        </NavLink>
      </ListItemButton>
      <ListItemButton onClick={handleRole} className="group">
        <ListItemIcon>
          <SecurityIcon className="text-sky-400 group-hover:scale-110" />
        </ListItemIcon>
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-gray-500">ບົດບາດ ແລະ ສິດທິ</span>
          {/* <ListItemText primary="Inbox" /> */}
          <span className="text-blue-500">
            {openrole ? <ExpandLess /> : <ExpandMore />}
          </span>
        </div>
      </ListItemButton>
      <Collapse in={openrole} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={settingrole}>
            <ListItemIcon>
              <ArrowRightIcon className="text-gray-400" />
            </ListItemIcon>
            <NavLink className="text-sm font-medium text-gray-400">
              ກຳນົດບົດບາດໃຫ້ User
            </NavLink>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={dataroleuser}>
            <ListItemIcon>
              <ArrowRightIcon className="text-gray-400" />
            </ListItemIcon>
            <NavLink className="text-sm font-medium text-gray-400">
              ສິດທີຂອງແຕ່ລະຄົນ
            </NavLink>
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick} className="group">
        <ListItemIcon>
          <SupervisorAccountIcon className="text-sky-400 group-hover:scale-110" />
        </ListItemIcon>
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-gray-500">ຂໍ້ມູນ Profiles</span>
          <span className="text-sky-500">
            {open ? <ExpandLess /> : <ExpandMore />}
          </span>
        </div>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={registeruser}>
            <ListItemIcon>
              <ArrowRightIcon className="text-gray-400" />
            </ListItemIcon>
            <NavLink className="text-sm font-medium text-gray-400">
              ລົງທະບຽນ ບັນຊີໃໝ່
            </NavLink>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={UserList}>
            <ListItemIcon>
              <ArrowRightIcon className="text-gray-400" />
            </ListItemIcon>
            <NavLink className="text-sm font-medium text-gray-400">
              ລາຍງານຂໍ້ມູນໂປຣໄຟຣ
            </NavLink>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={historyhome}>
            <ListItemIcon>
              <ArrowRightIcon className="text-gray-400" />
            </ListItemIcon>
            <NavLink className="text-sm font-medium text-gray-400">
              ປະຫວັດການເຄື່ອນໄຫວ
            </NavLink>
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleCountry} className="group">
        <ListItemIcon>
          <VpnLockIcon className="text-sky-400 group-hover:scale-110" />
        </ListItemIcon>
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-gray-500">ບ້ານ, ເມືອງ, ແຂວງ</span>
          <span className="text-blue-500">
            {opencountry ? <ExpandLess /> : <ExpandMore />}
          </span>
        </div>
      </ListItemButton>
      <Collapse in={opencountry} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={Province}>
            <ListItemIcon>
              <ArrowRightIcon className="text-gray-400" />
            </ListItemIcon>
            <NavLink className="text-sm font-medium text-gray-400">
              ຂໍ້ມູນແຂວງ
            </NavLink>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={District}>
            <ListItemIcon>
              <ArrowRightIcon className="text-gray-400" />
            </ListItemIcon>
            <NavLink className="text-sm font-medium text-gray-400">
              ຂໍ້ມູນ ເມືອງ, ບ້ານ
            </NavLink>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}
