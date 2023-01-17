import React, { useState, useEffect } from "react"
import "../App.css"
import { Routes, Route, useNavigate } from "react-router-dom"
import Dashboard from "./Dashboard"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import CssBaseline from "@mui/material/CssBaseline"
import { styled } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import AccountMenu from "./AccountMenu"
import Button from "@mui/material/Button"
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp"
import swal from "sweetalert"

// component files
import RegisterUser from "../user/RegisterUser"
import Province from "../country/Province"
import District from "../country/District"
import ProvinceUpdate from "../country/ProvinceUpdate"
import UpdateDistrict from "../country/UpdateDistrict"
import UserList from "../user/UserList"
import UserLogin from "../user/UserLogin"
import UpdateUserLogin from "../user/UpdateUserLogin"
import SettingUser from "../user/SettingUser"
import EditProfileDP from "../user/EditProfileDP"
import SettingsPer from "../user/SettingsPer"
import MenuDropdown from "./MenuDropdown"
import FormUse from "../user/FormUse"
import RoleName from "../Role/RoleName"
import DataRoleUser from "../user/DataRoleUser"
import Progress from "./loaded/Progress"
import BannerProfile from "./loaded/BannerProfile"
import UpdateForme from "./loaded/UpdateForme"
import SettringRole from "../user/SettingRole"
import HistoryHome from "../info_history/HistoryHome"
import EditProfile from "../user/EditProfile"
import RessPassword from "./loaded/RessPassword"
import MuiAppBar from "@mui/material/AppBar"
import UpdateProfile from "../user/user_Update/UpdateProfile"
import UpdateBec from "../user/user_Update/UpdateBec"
import Notification from "./Notification"
import EditImage from "../user/user_Update/EditImage"
import DetialProfile from "./loaded/DetialProfile"
import UserPage from "./sectionUser/UserPage"

const drawerWidth = 240

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}))

export default function PersistentDrawerLeft() {
  const [isLoaded, setIsLoaded] = useState(true)
  const [user, setUser] = useState([])
  const navigate = useNavigate()

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

  useEffect(() => {
    const token = localStorage.getItem("Token")
    var myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    }

    fetch("http://192.168.0.236:8000/apilogin/gettoken", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          setUser(result.userlogin)
          setIsLoaded(false)
        } else if (result.status === "forbidden") {
          swal({
            title: "ເຊຊັ່ນໝົດອາຍຸແລ້ວ",
            text: "ກະລຸນາລ໋ອກອີນເຂົ້າໃໝ່ອີກຄັັ້ງ!",
            icon: "error",
            button: "Login New",
          }).then((value) => {
            navigate("/Login")
          })
        }
        // console.log(result)
      })
      .catch((error) => console.log("error", error))
  }, [user])

  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  // medium ຂະໜາດໜ້າຈໍນ້ອຍ
  const [state, setState] = React.useState({
    left: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <Box
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader className="bg-blue-500">
          <span className="font-bold text-sky-500 text-2xl w-full text-left pl-4">
            <span
              id="fontName"
              className="text-xl drop-shadow-md font-bold text-white">
              <span id="fontName" className="text-white text-2xl">
                Manager App
              </span>
            </span>
          </span>
        </DrawerHeader>
        <Divider />
        <MenuDropdown />
        <Box
          onClick={handleLogout}
          className="absolute z-40 sticky-bottom-0 bottom-0 left-0 cursor-pointer bg-white group w-full hover:bg-gray-100 py-2 px-4 border-y gap-2 flex justify-start items-center">
          <div className="w-10 h-10 rounded-full bg-rose-100 group-hover:bg-rose-500 flex justify-center items-center">
            <LogoutSharpIcon
              className="group-hover:text-white text-gray-600"
              fontSize="14px"
            />
          </div>
          <span className="font-medium text-sm">ອອກຈາກລະບົບ</span>
        </Box>
      </Drawer>
    </Box>
  )

  if (isLoaded)
    return (
      <div>
        <Progress />
      </div>
    )
  else {
    return (
      <>
        {user.RoleName === "admin" ? (
          <Box>
            <Box className="lg:hidden md:hidden block">
              <div>
                {["left"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Box
                      position="fixed"
                      className=" absolute z-50 top-0 left-0 flex justify-between items-center shadow-sm bg-gray-200 w-full py-1 px-4">
                      <div className="w-full flex justify-start items-center ">
                        <Button onClick={toggleDrawer(anchor, true)}>
                          <div className="flex flex-col justify-center items-center gap-1">
                            <span className="w-8 h-[0.35rem] rounded-sm bg-sky-500"></span>
                            <span className="w-8 h-[0.35rem] rounded-sm bg-sky-500"></span>
                            <span className="w-8 h-[0.35rem] rounded-sm bg-sky-500"></span>
                          </div>
                        </Button>
                      </div>
                      <div className="flex justify-end items-center w-full">
                        <Box className="flex justify-center items-center gap-2">
                          <Notification />
                          <AccountMenu />
                        </Box>
                      </div>
                    </Box>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}>
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
              </div>
              <div className=" border md:p-2 p-1 bg-[#f7f7f7]">
                <Routes>
                  <Route index path="/Manager" element={<Dashboard />} />
                  <Route path="/registeruser" element={<RegisterUser />} />
                  <Route
                    path="updateprofile/:ProfileId"
                    element={<UpdateProfile />}
                  />
                  <Route path="updatebec/:ProfileId" element={<UpdateBec />} />
                  <Route path="/userlist" element={<UserList />} />
                  <Route path="/UserLogin" element={<UserLogin />} />
                  <Route path="/dataroleuser" element={<DataRoleUser />} />
                  {/* <Route path="/productsale" element={<ProductSale />} /> */}
                  <Route
                    path="EditProfile/:ProfileId"
                    element={<EditProfile />}
                  />
                  <Route path="EditImage/:UserId" element={<EditImage />} />
                  <Route
                    path="EditProfileDP/:ProfileId"
                    element={<EditProfileDP />}
                  />
                  <Route
                    path="updateuserlogin/:UserId"
                    element={<UpdateUserLogin />}
                  />
                  <Route
                    path="resspassword/:UserName"
                    element={<RessPassword />}
                  />
                  <Route path="settinguser/:UserId" element={<SettingUser />} />
                  <Route path="formuse" element={<FormUse />} />
                  <Route path="registeruser" element={<RegisterUser />} />
                  <Route path="settingrole" element={<SettringRole />} />
                  <Route path="settingsper/:UserId" element={<SettingsPer />} />
                  <Route path="bannerprofile" element={<BannerProfile />} />
                  <Route path="province" element={<Province />} />
                  <Route path="district" element={<District />} />
                  <Route path="rolename" element={<RoleName />} />
                  <Route path="historyhome" element={<HistoryHome />} />
                  <Route path="updateforme/:UserId" element={<UpdateForme />} />
                  <Route
                    path="detialProfile/:ProfileId"
                    element={<DetialProfile />}
                  />
                  <Route
                    path="provinceupdate/:ProvinceId"
                    element={<ProvinceUpdate />}
                  />
                  <Route
                    path="updatedistrict/:DistrictId"
                    element={<UpdateDistrict />}
                  />
                </Routes>
              </div>
            </Box>

            <Box className="lg:block md:block hidden">
              <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                  position="fixed"
                  elevation={1}
                  open={open}
                  className="bg-gradient-to-l from-gray-100 to-gray-200">
                  <Toolbar>
                    <IconButton
                      color="black"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{ mr: 2, ...(open && { display: "none" }) }}>
                      <MenuIcon />
                    </IconButton>
                    <span className="text-xl font-semibold text-gray-500 w-full">
                      ການຈັດການຜູ້ໃຊ້{" "}
                      <i className="text-red-500 font-medium">ໂປຣແກຣມ</i>
                    </span>
                    <div className="flex justify-end items-center w-full">
                      <Box className="flex justify-center items-center gap-2">
                        <Notification />
                        <AccountMenu />
                      </Box>
                    </div>
                  </Toolbar>
                </AppBar>

                <Drawer
                  sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                      width: drawerWidth,
                      boxSizing: "border-box",
                    },
                  }}
                  variant="persistent"
                  anchor="left"
                  open={open}>
                  <DrawerHeader className="bg-sky-500">
                    <span className="font-bold text-sky-500 text-2xl w-full text-left pl-4">
                      <span
                        id="fontName"
                        className="text-xl drop-shadow-md font-bold text-white">
                        <span id="fontName" className="text-white text-2xl">
                          Manager App
                        </span>
                      </span>
                    </span>
                  </DrawerHeader>

                  <Divider />
                  <MenuDropdown />
                  <Box
                    onClick={handleLogout}
                    className="absolute z-40 sticky-bottom-0 bottom-0 left-0 cursor-pointer group bg-white w-full hover:bg-gray-100 py-2 px-4 border-y gap-2 flex justify-start items-center">
                    <div className="w-10 h-10 rounded-full bg-rose-100 group-hover:bg-rose-400 group-hover:ease-in group-hover:duration-200 flex justify-center items-center">
                      <LogoutSharpIcon
                        className="group-hover:text-white text-gray-600"
                        fontSize="14px"
                      />
                    </div>
                    <span className="font-medium text-sm">ອອກຈາກລະບົບ</span>
                  </Box>
                </Drawer>

                <Main open={open} className="bg-[#f7f7f7] md:p-2 p-1">
                  <DrawerHeader />
                  <Routes>
                    <Route index path="/Manager" element={<Dashboard />} />
                    <Route path="/registeruser" element={<RegisterUser />} />
                    <Route
                      path="updateprofile/:ProfileId"
                      element={<UpdateProfile />}
                    />
                    <Route
                      path="updatebec/:ProfileId"
                      element={<UpdateBec />}
                    />
                    <Route path="/userlist" element={<UserList />} />
                    <Route path="/UserLogin" element={<UserLogin />} />
                    {/* <Route path="/productsale" element={<ProductSale />} /> */}
                    <Route path="/dataroleuser" element={<DataRoleUser />} />
                    <Route
                      path="EditProfile/:ProfileId"
                      element={<EditProfile />}
                    />
                    <Route path="EditImage/:UserId" element={<EditImage />} />
                    <Route
                      path="EditProfileDP/:ProfileId"
                      element={<EditProfileDP />}
                    />
                    <Route
                      path="updateuserlogin/:UserId"
                      element={<UpdateUserLogin />}
                    />
                    <Route
                      path="resspassword/:UserName"
                      element={<RessPassword />}
                    />
                    <Route
                      path="settinguser/:UserId"
                      element={<SettingUser />}
                    />
                    <Route path="formuse" element={<FormUse />} />
                    <Route path="registeruser" element={<RegisterUser />} />
                    <Route path="settingrole" element={<SettringRole />} />
                    <Route
                      path="settingsper/:UserId"
                      element={<SettingsPer />}
                    />
                    <Route path="bannerprofile" element={<BannerProfile />} />
                    <Route path="province" element={<Province />} />
                    <Route path="district" element={<District />} />
                    <Route path="rolename" element={<RoleName />} />
                    <Route path="historyhome" element={<HistoryHome />} />
                    <Route
                      path="updateforme/:UserId"
                      element={<UpdateForme />}
                    />
                    <Route
                      path="detialProfile/:ProfileId"
                      element={<DetialProfile />}
                    />
                    <Route
                      path="provinceupdate/:ProvinceId"
                      element={<ProvinceUpdate />}
                    />
                    <Route
                      path="updatedistrict/:DistrictId"
                      element={<UpdateDistrict />}
                    />
                  </Routes>
                </Main>
              </Box>
            </Box>
          </Box>
        ) : (
          <div className="w-full bg-white h-screen border">
            <UserPage />
          </div>
        )}
      </>
    )
  }
}
