import  React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip" 
import NotifiData from "./loaded/NotifiData"
import Badge from "@mui/material/Badge"
import Stack from "@mui/material/Stack"
import MailIcon from "@mui/icons-material/Mail"
import axios from "axios"

export default function Notification() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Seculity token
  // const [user, setUser] = useState([])

  // useEffect(() => {
  //   const token = localStorage.getItem("Token")
  //   var myHeaders = new Headers()
  //   myHeaders.append("Authorization", "Bearer " + token)
  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   }

  //   fetch("http://192.168.0.12:8000/apilogin/gettoken", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setUser(result.userlogin)
  //       if (user.RoleName === "admin") {
  //         setAdmin(false)
  //       } else if (user.RoleName === "manager") {
  //         setManger(false)
  //       } else if (user.RoleName === "user") setManger(true)
  //     })
  //     .catch((error) => console.log("error", error))
  // }, [user])

  
  const [profile, setProfile] = useState("")

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    // count profile
    try {
      const rescoutProfile = await axios.get("http://192.168.0.12:8000/countuser")
      setProfile(rescoutProfile.data)
    } catch (error) {
      console.log(error)
    }

  }

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
            <Stack spacing={2} direction="row">
              <Badge badgeContent={profile.count} color="primary">
                <MailIcon color="action" />
              </Badge>
            </Stack>
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
        <div className="md:w-[28rem] w-full h-[27rem] p-1 overflow-hidden">
          <NotifiData />
        </div>
      </Menu>
    </React.Fragment>
  )
}
