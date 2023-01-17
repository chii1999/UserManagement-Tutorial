import * as React from "react"
import "../../App.css"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import { NavLink, useNavigate } from "react-router-dom"
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic"
import PortraitIcon from "@mui/icons-material/Portrait"
import PointOfSaleIcon from "@mui/icons-material/PointOfSale"
import LogoutIcon from "@mui/icons-material/Logout"
import Box from "@mui/material/Box"
import swal from "sweetalert"

export default function MenuDropdown() {
  const [open, setOpen] = React.useState(false)
  const [openrole, setOpenrole] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  const handleRole = () => {
    setOpenrole(!openrole)
  }

  //   click NavLink to file menu
  const history = useNavigate()
  const Manager = () => {
    history("/Manager")
  }
  //   const Productsale = () => {
  //     history("/Productsale")
  //   }
  const UserLogin = () => {
    history("/UserLogin")
  }
  const proDuctsale = () => {
    history("/productsale")
  }
  //   const dataroleuser = () => {
  //     history("/dataroleuser")
  //   }
  //   const registeruser = () => {
  //     history("/registeruser")
  //   }
  //   const UserList = () => {
  //     history("/UserList")
  //   }
  //   const historyhome = () => {
  //     history("/historyhome")
  //   }
  //   const Province = () => {
  //     history("/Province")
  //   }
  //   const District = () => {
  //     history("/District")
  //   }

  const handleLogout = () => {
    swal({
      title: "ທ່ານໝັ້ນໃຈແລ້ວບໍ?",
      text: "ບັນຊີນີ້ຈະຖຶກອອກຈາກລະບົບ ຫາກຕ້ອງການເຂົ້າໃໝ່ ຕ້ອງລ໋ອກອິນເຂົ້າອິກຄັັ້ງ",
      icon: "warning",
      buttons: {
        cancel: "ຍັງບໍ່ອອກ",
        catch: {
          text: "ອອກທັນທີ",
          value: "catch",
        },
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("Token")
        swal("ບັນຊີຖຶກອອກຈາກລະບົບແລ້ວ ກະລຸນາລ໋ອກອິນເຂົ້າໃໝ່ເທົ່ານັ້ນ", {
          icon: "success",
          buttons: false,
        })
        history("/login")
      }
    })
  }

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      <Box className="w-full py-3 h-20 bg-sky-500 text-white -mt-4 flex justify-center items-center">
        <span className="text-2xl font-medium">Manger App</span>
      </Box>
      <ListItemButton onClick={Manager} className="group mt-2">
        <ListItemIcon>
          <AutoAwesomeMosaicIcon className="text-sky-400 group-hover:scale-110" />
        </ListItemIcon>
        <NavLink className=" font-medium text-gray-500">
          ໜ້າທຳອິດ ຂອງແອບ
        </NavLink>
      </ListItemButton>
      <ListItemButton onClick={proDuctsale} className="group">
        <ListItemIcon>
          <PointOfSaleIcon className="text-sky-400 group-hover:scale-110" />
        </ListItemIcon>
        <NavLink className=" font-medium text-gray-500">ຂາຍສິນຄ້າ</NavLink>
      </ListItemButton>
      <ListItemButton onClick={proDuctsale} className="group">
        <ListItemIcon>
          <PointOfSaleIcon className="text-sky-400 group-hover:scale-110" />
        </ListItemIcon>
        <NavLink className=" font-medium text-gray-500">ລາຍງານການຂາຍ</NavLink>
      </ListItemButton>
      <Divider />
      <ListItemButton onClick={UserLogin} className="group">
        <ListItemIcon>
          <PortraitIcon className=" text-sky-400 group-hover:scale-110" />
        </ListItemIcon>
        <NavLink className=" font-medium text-gray-500">
          ບັນຊີນຳໃຊ້ລະບົບ
        </NavLink>
      </ListItemButton>
      <ListItemButton onClick={handleLogout} className="group">
        <ListItemIcon>
          <LogoutIcon className=" text-red-500 group-hover:scale-110" />
        </ListItemIcon>
        <NavLink className=" font-medium text-gray-500">ອອກຈາກລະບົບ</NavLink>
      </ListItemButton>
    </List>
  )
}
