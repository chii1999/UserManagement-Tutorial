import React, { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import DescriptionIcon from "@mui/icons-material/Description"
import MmsIcon from "@mui/icons-material/Mms"
import swal from "sweetalert"
import AddModeratorIcon from "@mui/icons-material/AddModerator"


export default function AccountMenu() {
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    swal({
      title: "ທ່ານແນ່ໃຈບໍ?",
      text: "ບັນຊີນີ້ຈະຖຶກອອກຈາກໂປຣແກຣມທັນທີ",
      icon: "warning",
      buttons: {
        cancel: "ບໍ່ຕ້ອງການອອກ",
        catch: {
          text: "OK",
          value: "catch",
        },
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("Token")
        navigate("/login")
        swal("ບັນຊີຖຶກອອກຈາກລະບົບແລ້ວ ກະລຸນາລ໋ອກອິນເຂົ້າໃໝ່ເທົ່ານັ້ນ", {
          icon: "success",
          buttons: false,
        })
      } else {
        navigate("/manager")
      }
    })
  }
  const goManager = () => {
    navigate("/BannerProfile")
  }

  // Seculity token
  const [manager, setManger] = useState(true)
  const [admin, setAdmin] = useState(true)
  const [user, setUser] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("Token")
    var myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    }

    fetch("http://192.168.0.12:8000/apilogin/gettoken/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUser(result.userlogin)
        if (user.RoleName === "admin") {
          setAdmin(false)
        } else if (user.RoleName === "manager") {
          setManger(false)
        } else if (user.RoleName === "user") setManger(true)
      })
      .catch((error) => console.log("error", error))
  }, [user])

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
              <Avatar src={`http://192.168.0.12:8000/apilogin/${user.Img}`} sx={{ bgcolor: "#3f51b5" }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.13))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 15,
              height: 15,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <div className="w-[15rem]">
          <MenuItem onClick={goManager} className="flex gap-4 cursor-default">
            <Avatar src={`http://192.168.0.12:8000/apilogin/${user.Img}`} alt={user.UserName} sx={{ width: 53, height: 53 }} />
            {/* <div className="w-12 h-12 rounded-full bg-slate-600"></div> */}
            <span className="uppercase font-medium text-gray-600">
              {user.UserName}
            </span>
          </MenuItem>
          {/* <Box className="flex justify-start items-center gap-2 px-2 pr-8">
          <img src="#" alt="U" className="w-10 h-10 rounded-full bg-slate-500" />
          <span className="uppercase font-medium text-sky-400">
              {user.UserName}
            </span>
        </Box> */}
          <Divider />
          {!admin && (
            <MenuItem>
              <NavLink
                to="/registeruser"
                className="flex justify-center items-center">
                <ListItemIcon>
                  <PersonAddAlt1Icon
                    fontSize="small"
                    className="text-sky-400"
                  />
                </ListItemIcon>
                <span className="font-medium text-gray-500">ສະໝັກບັນຊີໃໝ່</span>
              </NavLink>
            </MenuItem>
          )}
          {!manager && (
            <MenuItem>
              <NavLink
                to="/registeruser"
                className="flex justify-center items-center">
                <ListItemIcon>
                  <PersonAddAlt1Icon
                    fontSize="small"
                    className="text-sky-400"
                  />
                </ListItemIcon>
                <span className="font-medium text-gray-500">ສະໝັກບັນຊີໃໝ່</span>
              </NavLink>
            </MenuItem>
          )}
          <MenuItem>
            <NavLink
              to="/bannerProfile"
              className="flex justify-center items-center">
              <ListItemIcon>
                <MmsIcon fontSize="small" className="text-sky-400" />
              </ListItemIcon>
              <span className="font-medium text-gray-500">ໂປຣໄຟຣຂອງຂ້ອຍ</span>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to="/historyhome"
              className="flex justify-center items-center">
              <ListItemIcon>
                <DescriptionIcon fontSize="small" className="text-sky-400" />
              </ListItemIcon>
              <span className="font-medium text-gray-500">ການເຄື່ອນໄຫວ</span>
            </NavLink>
          </MenuItem>
          {!admin && (
            <MenuItem>
              <NavLink
                to="/rolename"
                className="flex justify-center items-center">
                <ListItemIcon>
                  <AddModeratorIcon fontSize="small" className="text-sky-400" />
                </ListItemIcon>
                <span className="font-medium text-gray-500">ຂໍ້ມູນບົດບາດ</span>
              </NavLink>
            </MenuItem>
          )}
          <MenuItem>
            <button onClick={handleLogout}>
              <NavLink
                to="../signin"
                className="flex justify-cneter items-center">
                <ListItemIcon>
                  <PowerSettingsNewIcon
                    fontSize="small"
                    className="text-rose-400"
                  />
                </ListItemIcon>
                <span className="font-medium text-gray-500">ອອກຈາກລະບົບ</span>
              </NavLink>
            </button>
          </MenuItem>
        </div>
      </Menu>
    </React.Fragment>
  )
}
