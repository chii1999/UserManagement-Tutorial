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

    return (
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader">
        <ListItemButton className="group">
          <ListItemIcon>
            <AutoAwesomeMosaicIcon className="text-sky-400 group-hover:scale-110" />
          </ListItemIcon>
          <NavLink to="/Manager" className=" font-medium text-gray-500">
            ໜ້າທຳອິດ ຂອງແອບ
          </NavLink>
        </ListItemButton>
        <ListItemButton className="group">
          <ListItemIcon>
            <PortraitIcon className=" text-sky-400 group-hover:scale-110" />
          </ListItemIcon>
          <NavLink to="/UserLogin" className=" font-medium text-gray-500">
            ບັນຊີນຳໃຊ້ລະບົບ
          </NavLink>
        </ListItemButton>
        {/* <ListItemButton >
        <ListItemIcon>
          <ListAltIcon className=" text-blue-500" />
        </ListItemIcon>
        <NavLink to="/DataRoleUser" className=" font-medium text-gray-500">
          ເບິ່ງບົດບາດ User
        </NavLink>
      </ListItemButton> */}

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
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon className="text-gray-400" />
              </ListItemIcon>
              <NavLink
                to="/settingrole"
                className="text-sm font-medium text-gray-400">
                ກຳນົດບົດບາດໃຫ້ User
              </NavLink>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon className="text-gray-400" />
              </ListItemIcon>
              <NavLink
                to="/dataroleuser"
                className="text-sm font-medium text-gray-400">
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
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon className="text-gray-400" />
              </ListItemIcon>
              <NavLink
                to="/registeruser"
                className="text-sm font-medium text-gray-400">
                ລົງທະບຽນ ບັນຊີໃໝ່
              </NavLink>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon className="text-gray-400" />
              </ListItemIcon>
              <NavLink
                to="/UserList"
                className="text-sm font-medium text-gray-400">
                ລາຍງານຂໍ້ມູນໂປຣໄຟຣ
              </NavLink>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon className="text-gray-400" />
              </ListItemIcon>
              <NavLink
                to="/historyhome"
                className="text-sm font-medium text-gray-400">
                ປະຫວັດການເຄື່ອນໄຫວ
              </NavLink>
            </ListItemButton>
            {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ArrowRightIcon className="text-blue-500" />
            </ListItemIcon>
            <NavLink to="/" className="text-sm font-medium text-blue-500">
              ສິດນຳໃຊ້ຂອງແຕ່ລະຄົນ
            </NavLink>
          </ListItemButton> */}
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
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon className="text-gray-400" />
              </ListItemIcon>
              <NavLink
                to="/Province"
                className="text-sm font-medium text-gray-400">
                ຂໍ້ມູນແຂວງ
              </NavLink>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon className="text-gray-400" />
              </ListItemIcon>
              <NavLink
                to="/District"
                className="text-sm font-medium text-gray-400">
                ຂໍ້ມູນ ເມືອງ, ບ້ານ
              </NavLink>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    )
}
