import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
import SecurityIcon from "@mui/icons-material/Security"
import PortraitIcon from "@mui/icons-material/Portrait"
import swal from "sweetalert"
import AddModeratorIcon from "@mui/icons-material/AddModerator"
import { motion } from "framer-motion"

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
        navigate("/login")
      }
    })
  }

  const goManager = () => {
    navigate("/BannerProfile")
  }
   const UserLogin = () => {
    navigate("/UserLogin")
  }
  const registeruser = () => {
    navigate("/registeruser")
  }
  const historyhome = () => {
    navigate("/historyhome")
  }
  const rolename = () => {
    navigate("/rolename")
  }
  const dataroleuser = () => {
        navigate("/dataroleuser")
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

    fetch("http://192.168.0.236:8000/apilogin/gettoken/", requestOptions)
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

  const animateForm = { opacity: 0, y: -40 }
  const animateTo = { opacity: 1, y: 0 }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            <Avatar
              src={`http://192.168.0.236:8000/apilogin/${user.Img}`}
              sx={{ bgcolor: "#3f51b5" }}></Avatar>
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
            <Avatar
              src={`http://192.168.0.236:8000/apilogin/${user.Img}`}
              alt={user.UserName}
              sx={{ width: 53, height: 53 }}
            />
            <span className="uppercase font-medium text-gray-600">
              {user.UserName}
            </span>
          </MenuItem>
          <Divider />
          <MenuItem>
            <motion.NavLink
              initial={animateForm}
              animate={animateTo}
              transition={{ delay: 0.2 }}
              onClick={goManager}
              className="flex justify-center items-center">
              <ListItemIcon>
                <MmsIcon fontSize="small" className="text-sky-400" />
              </ListItemIcon>
              <span className="font-medium text-gray-500">ໂປຣໄຟຣຂອງຂ້ອຍ</span>
            </motion.NavLink>
          </MenuItem>
          <MenuItem>
            <motion.NavLink
              initial={animateForm}
              animate={animateTo}
              transition={{ delay: 0.05 }}
              onClick={UserLogin}
              className="flex justify-center items-center">
              <ListItemIcon>
                <PortraitIcon fontSize="small" className="text-sky-400" />
              </ListItemIcon>
              <span className="font-medium text-gray-500">ຂໍ້ມູນບັນຊີ</span>
            </motion.NavLink>
          </MenuItem>
          <MenuItem>
            <motion.NavLink
              initial={animateForm}
              animate={animateTo}
              transition={{ delay: 0.1 }}
              onClick={dataroleuser}
              className="flex justify-center items-center">
              <ListItemIcon>
                <SecurityIcon fontSize="small" className="text-sky-400" />
              </ListItemIcon>
              <span className="font-medium text-gray-500">ບົດບາດ, ສິດທີ</span>
            </motion.NavLink>
          </MenuItem>
          {!admin && (
            <MenuItem>
              <motion.NavLink
                initial={animateForm}
                animate={animateTo}
                transition={{ delay: 0.2 }}
                onClick={registeruser}
                className="flex justify-center items-center">
                <ListItemIcon>
                  <PersonAddAlt1Icon
                    fontSize="small"
                    className="text-sky-400"
                  />
                </ListItemIcon>
                <span className="font-medium text-gray-500">ສະໝັກບັນຊີໃໝ່</span>
              </motion.NavLink>
            </MenuItem>
          )}
          {!manager && (
            <MenuItem>
              <motion.NavLink
                initial={animateForm}
                animate={animateTo}
                transition={{ delay: 0.3 }}
                onClick={registeruser}
                className="flex justify-center items-center">
                <ListItemIcon>
                  <PersonAddAlt1Icon
                    fontSize="small"
                    className="text-sky-400"
                  />
                </ListItemIcon>
                <span className="font-medium text-gray-500">ສະໝັກບັນຊີໃໝ່</span>
              </motion.NavLink>
            </MenuItem>
          )}
          <MenuItem>
            <motion.NavLink
              initial={animateForm}
              animate={animateTo}
              transition={{ delay: 0.4 }}
              onClick={historyhome}
              className="flex justify-center items-center">
              <ListItemIcon>
                <DescriptionIcon fontSize="small" className="text-sky-400" />
              </ListItemIcon>
              <span className="font-medium text-gray-500">ການເຄື່ອນໄຫວ</span>
            </motion.NavLink>
          </MenuItem>
          {!admin && (
            <MenuItem>
              <motion.NavLink
                initial={animateForm}
                animate={animateTo}
                transition={{ delay: 0.5 }}
                onClick={rolename}
                className="flex justify-center items-center">
                <ListItemIcon>
                  <AddModeratorIcon fontSize="small" className="text-sky-400" />
                </ListItemIcon>
                <span className="font-medium text-gray-500">ຂໍ້ມູນບົດບາດ</span>
              </motion.NavLink>
            </MenuItem>
          )}
          <MenuItem>
            <button onClick={handleLogout}>
              <motion.NavLink
                initial={animateForm}
                animate={animateTo}
                transition={{ delay: 0.6 }}
                to="../signin"
                className="flex justify-cneter items-center">
                <ListItemIcon>
                  <PowerSettingsNewIcon
                    fontSize="small"
                    className="text-rose-400"
                  />
                </ListItemIcon>
                <span className="font-medium text-gray-500">ອອກຈາກລະບົບ</span>
              </motion.NavLink>
            </button>
          </MenuItem>
        </div>
      </Menu>
    </React.Fragment>
  )
}
